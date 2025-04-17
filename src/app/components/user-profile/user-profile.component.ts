import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { IUserVM } from '../../vms/Iuser.vm';
import { UserService } from '../../services/user.service';
import { map } from 'rxjs';
import { Router } from '@angular/router';

// Register Chart.js components
Chart.register(...registerables);

@Component({
  selector: 'app-user-profile',
  standalone: false,
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent implements OnInit {
  @ViewChild('fileInput') fileInput!: ElementRef;
  userProfile:any = null;
  // User data
  user: IUserVM = {
    username:"",
    email:"",
    joinDate: new Date(),
    profileImage: null
  };

  // Health information
  healthInfo: any = {
    currentWeight: 75,
    targetWeight: 70, 
    height: 175,
    dailyCalories: 2400,
    averageSleep: 7.5,
    nutrition: {
      protein: 0,
      carbs: 0,
      fat: 0
    }
  };

  // Recent workouts data
  recentWorkouts: any[] = [
    {
      type: 'Running',
      duration: 45,
      caloriesBurned: 420
    },
    {
      type: 'Weightlifting',
      duration: 60,
      caloriesBurned: 350
    },
    {
      type: 'Cycling',
      duration: 30,
      caloriesBurned: 280
    }
  ];

  // Chart data
  weightData: any[] = [];
  calorieData: any[] = [];
  timeFilter: string = 'week';

  weightChart: any;
  caloriesChart: any;
  nutritionChart: any;

  constructor(private  userService:UserService , private router:Router) { }

  ngOnInit(): void {
    this.user.username = this.userService.userSignal().username || 'User';
    this.user.email = this.userService.userSignal().email || '';
    this.userService.getUserInfo().subscribe((response) => {
      console.log("Response", response);
      if(response.data){
        this.userProfile = response.data;
      }
      this.user.userData = response.data;
      this.healthInfo = {
        ...this.healthInfo,
        currentWeight: this.user.userData?.weight,
        targetWeight: this.user.userData?.targetWeight,
        height: this.user.userData?.height,
        activityLevel: this.user.userData?.activityLevel,
        nutrition:{
          protein: (this.user.userData?.calories as number * 0.2).toFixed(0),
          carbs: (this.user.userData?.calories as number * 0.5).toFixed(0),
          fat: (this.user.userData?.calories as number * 0.25).toFixed(0)
        },
        dailyCalories: this.user.userData?.calories,
        restingHeartRate: this.user.restingHeartRate,
        averageSleep: this.user.averageSleep,
        dailySteps: this.user.dailySteps
      };
      this.generateMockData();
      setTimeout(() => {
        this.initCharts();
      }, 100);
    } , (err) => {
      console.log("Error While Fetching User Info : " , err);
    })
  }

  generateMockData(): void {
    // Generate mock weight data
    const today = new Date();
    this.weightData = Array(30).fill(0).map((_, i) => {
      const date = new Date();
      date.setDate(today.getDate() - (29 - i));
      // Generate a weight value between 73 and 76
      const weight = 76 - (i * 0.1) + (Math.random() * 0.4 - 0.2);
      return { date, weight: parseFloat(weight.toFixed(1)) };
    });

    // Generate mock calorie data
    this.calorieData = Array(30).fill(0).map((_, i) => {
      const date = new Date();
      date.setDate(today.getDate() - (29 - i));
      // Generate a calorie value between 2200 and 2600
      const calories = 2400 + (Math.random() * 400 - 200);
      return { date, calories: Math.round(calories) };
    });
  }

  initCharts(): void {
    this.initWeightChart();
    this.initCaloriesChart();
    this.initNutritionChart();
  }

  initWeightChart(): void {
    const ctx = document.getElementById('weightChart') as HTMLCanvasElement;
    if (!ctx) return;
    
    const filteredData = this.getFilteredData(this.weightData);
    
    this.weightChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: filteredData.map(d => this.formatDate(d.date)),
        datasets: [{
          label: 'Weight (kg)',
          data: filteredData.map(d => d.weight),
          borderColor: '#3498db',
          backgroundColor: 'rgba(52, 152, 219, 0.1)',
          borderWidth: 2,
          tension: 0.3,
          fill: true
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          y: {
            beginAtZero: false,
            min: Math.floor(Math.min(...filteredData.map(d => d.weight))) - 1,
            max: Math.ceil(Math.max(...filteredData.map(d => d.weight))) + 1
          }
        }
      }
    });
  }

  initCaloriesChart(): void {
    const ctx = document.getElementById('caloriesChart') as HTMLCanvasElement;
    if (!ctx) return;
    
    const filteredData = this.getFilteredData(this.calorieData);
    
    this.caloriesChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: filteredData.map(d => this.formatDate(d.date)),
        datasets: [{
          label: 'Calories',
          data: filteredData.map(d => d.calories),
          backgroundColor: 'rgba(231, 76, 60, 0.7)',
          borderRadius: 5
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          }
        }
      }
    });
  }

  initNutritionChart(): void {
    const ctx = document.getElementById('nutritionChart') as HTMLCanvasElement;
    if (!ctx) return;
    
    this.nutritionChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Protein', 'Carbs', 'Fat'],
        datasets: [{
          data: [
            this.healthInfo.nutrition.protein, 
            this.healthInfo.nutrition.carbs, 
            this.healthInfo.nutrition.fat
          ],
          backgroundColor: [
            'rgba(155, 89, 182, 0.7)',
            'rgba(52, 152, 219, 0.7)',
            'rgba(241, 196, 15, 0.7)'
          ],
          borderWidth: 0
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              boxWidth: 12,
              padding: 15
            }
          }
        },
        cutout: '70%'
      }
    });
  }

  getFilteredData(data: any[]): any[] {
    const today = new Date();
    let daysToShow = 7;
    
    switch(this.timeFilter) {
      case 'week':
        daysToShow = 7;
        break;
      case 'month':
        daysToShow = 30;
        break;
      case 'year':
        daysToShow = 365;
        break;
    }
    
    return data.slice(-daysToShow);
  }

  formatDate(date: Date): string {
    if (this.timeFilter === 'week') {
      return date.toLocaleDateString('en-US', { weekday: 'short' });
    } else if (this.timeFilter === 'month') {
      return date.toLocaleDateString('en-US', { day: 'numeric', month: 'short' });
    } else {
      return date.toLocaleDateString('en-US', { month: 'short' });
    }
  }

  setTimeFilter(filter: string): void {
    this.timeFilter = filter;
    
    if (this.weightChart) {
      this.weightChart.destroy();
    }
    if (this.caloriesChart) {
      this.caloriesChart.destroy();
    }
    
    this.initWeightChart();
    this.initCaloriesChart();
  }

  calculateProgress(): number {
    if (!this.healthInfo?.currentWeight || !this.healthInfo?.targetWeight) {
      return 0;
    }
    
    const startWeight = 80; // Initial weight, could be stored in healthInfo
    const targetWeight = this.healthInfo.targetWeight;
    const currentWeight = this.healthInfo.currentWeight;
    
    // If target is lower than starting weight (weight loss goal)
    if (targetWeight < startWeight) {
      const totalToLose = startWeight - targetWeight;
      const lost = startWeight - currentWeight;
      return Math.min(Math.max(Math.round((lost / totalToLose) * 100), 0), 100);
    } 
    // If target is higher than starting weight (weight gain goal)
    else {
      const totalToGain = targetWeight - startWeight;
      const gained = currentWeight - startWeight;
      return Math.min(Math.max(Math.round((gained / totalToGain) * 100), 0), 100);
    }
  }

  getActivityDescription(): string {
    const descriptions = {
      'low': 'Little to no regular exercise. Mostly sitting activities like desk job or watching TV.',
      'medium': 'Moderate exercise 3-5 days per week. Regular activities include jogging or light sports.',
      'high': 'Very active lifestyle with intense exercise and physical activity daily.'
    };
    
    type ActivityLevel = keyof typeof descriptions;
    const activityLevel = (this.healthInfo?.activityLevel as ActivityLevel) || 'medium';
    return descriptions[activityLevel];
  }

  getWorkoutIcon(type: string): string {
    const icons: Record<string, string> = {
      'Running': 'fas fa-running',
      'Weightlifting': 'fas fa-dumbbell',
      'Cycling': 'fas fa-biking',
      'Swimming': 'fas fa-swimming-pool',
      'Yoga': 'fas fa-pray',
      'HIIT': 'fas fa-bolt'
    };
    
    return icons[type] || 'fas fa-dumbbell';
  }
  triggerFileInput(): void {
    this.fileInput.nativeElement.click();
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.user.profileImage = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  openEditProfileModal(): void {
    this.router.navigate(['/services/user-info'] , {
      queryParams : {update : 1}
    });
  }

  addWorkout(): void {
    console.log('Add new workout');
  }
  getStarted(){
    this.router.navigate(['/services/user-info'])
  }
}
