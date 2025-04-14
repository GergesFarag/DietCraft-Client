import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  standalone: false,
  templateUrl: './about.component.html',
  styleUrl: './about.component.css',
})
export class AboutComponent {
  aboutInfo = {
    title: "DIET CRAFT",
    motivation: "Our innovative project aims to simplify the journey toward better nutrition by providing a comprehensive platform that helps individuals create a healthy and effective diet tailored to their needs. By offering  an extensive database of foods with comparable nutritional values, users can easily explore alternatives that fit their dietary goals. Additionally, our advanced search functionality allows for targeted inquiries based on specific health values, enabling personalized recommendations that empower users to make informed choices for a balanced lifestyle.",
    objectives: [
      'Generation of efficient diet plans and suggest food.',
      'Providing knowledge for basics of healthy life style.',
      'Food categorization  with nutritional values.',
      'Searching for food contains wanted nutritional values.',
    ],
    conclusion:"Whether you’re looking to lose weight, gain energy, or simply eat healthier, our project is designed to support you every step of the way."
  };
}
