import {
  Component,
  Input,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewChecked,
} from "@angular/core";
import { OpenAIService } from "../../services/open-ai.service";
import { finalize } from "rxjs/operators";
import { IChatMessage } from "../../models/IChatMessage";
@Component({
  selector: "app-chat-bot",
  templateUrl: "./chatbot.component.html",
  standalone: false,
  styleUrl: "./chatbot.component.css",
})
export class ChatBotComponent implements OnInit, AfterViewChecked {
  botName: string = "Crafty Coach";
  welcomeMessage: string = "Hello! How can I help you today?";
  initialSuggestions: string[] = [
    "Plan a workout for me",
    "Get me the nutients in a food",
    "I want to lose weight , provide me a diet plan",
  ];
  @ViewChild("messagesContainer") private messagesContainer!: ElementRef;

  messages: IChatMessage[] = [];
  userInput: string = "";
  isTyping: boolean = false;
  suggestions: string[] = [];

  constructor(private openAIService: OpenAIService) {}

  ngOnInit(): void {
    this.suggestions = [...this.initialSuggestions];
    setTimeout(() => {
      this.addMessage(this.welcomeMessage, true);
    }, 500);
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    this.messagesContainer.nativeElement.scrollTop =
      this.messagesContainer.nativeElement.scrollHeight;
  }

  sendMessage(): void {
    const messageContent = this.userInput.trim();
    if (!messageContent) return;
    this.addMessage(messageContent, false);

    this.userInput = "";
    this.suggestions = [];
    this.isTyping = true;
    console.log("Sending message to OpenAI:", messageContent);
    this.openAIService
      .getResponse(messageContent)
      .pipe(
        finalize(() => {
          this.isTyping = false;
        })
      )
      .subscribe({
        next: (response: any) => {
          console.log("Received response from OpenAI:", response);
          this.addMessage(response.message, true);
        },
        error: (error: Error) => {
          this.addMessage(
            "Sorry, I encountered an error processing your request. Please try again later.",
            true
          );
          console.error("OpenAI service error:", error);
        },
      });
  }
  addMessage(content: string, isBot: boolean): void {
    this.messages.push({
      content,
      isBot,
      timestamp: new Date(),
    });
  }

  selectSuggestion(suggestion: string): void {
    this.userInput = suggestion;
    this.sendMessage();
  }

  resetChat(): void {
    this.messages = [];
    this.suggestions = [...this.initialSuggestions];
    this.addMessage(this.welcomeMessage, true);
  }
}
