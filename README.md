# HeartSprouts

HeartSprouts is a mobile application designed to help young adults foster and maintain genuine connections with friends and family amidst the demands of modern life. By leveraging the convenience of digital technology, our platform facilitates meaningful interactions, provides valuable insights, and offers timely reminders to prioritize relationships.

## Table of Contents
- [Motivation](#motivation)
- [Aim](#aim)
- [User Stories](#user-stories)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [User Research Samples and Examples](#Research)
- [Usage](#usage)
- [Screens](#screens)

## Motivation
In today’s fast-paced world, maintaining close, intentional, and loving relationships can be challenging, especially for young adults juggling various life changes and digital distractions. As two 21-year-old students, we have experienced firsthand how difficult it can be to stay connected with those who matter most. We believe that fostering and maintaining genuine relationships is crucial for personal growth, combating mental health issues, and empowering individuals to take control of their social lives. HeartSprouts was born out of this realization, aiming to bridge the gap between digital convenience and meaningful human connections.

## Aim
Our aim is to create a mobile application that serves as a personal relationship companion for young adults. HeartSprouts empowers users to nurture and sustain genuine connections with friends and family amidst the demands of modern life. By providing timely reminders, insightful prompts, and a platform for intentional interactions, we hope to make maintaining relationships easier and more fulfilling.

## User Stories
- **Create Profiles**: As a young adult who wants to stay connected with my friends and family, I want to create profiles for each of my close relationships, including details like hobbies, birthdays, and important milestones. This helps me remember key details about my loved ones and makes interactions more personal.
- **Regular Communication**: As a young adult who values regular communication, I want to receive reminders to check in on my friends and family members. These reminders help me stay in touch and maintain regular contact.
- **Remember Important Dates**: As a young adult who tends to forget important dates, I want to receive reminders for birthdays, outings, and other significant events. This ensures that I never miss an important occasion.
- **Weekly Reflection**: As a young adult who wants to deepen my understanding of my relationships, I want to receive weekly reflection prompts. These prompts encourage me to think about my interactions and how I can improve them.
- **Social Outing Prep**: As a young adult preparing for a social outing, I want to receive a reminder with details about my friend. This helps me prepare for meaningful conversations and shows that I care.
- **Daily Inspiration**: As a young adult seeking inspiration, I want to receive a daily prompt encouraging intentional actions or conversations. These prompts motivate me to take small but meaningful steps to strengthen my relationships.

## Features
### Core Features
- **Create Profiles**: Maintain a digital "rolodex" of closest connections, with details like hobbies, events, and birthdays. This feature helps users keep track of important information about their loved ones, making interactions more meaningful.
- **Reminders for Important Days**: Send reminders for birthdays, outings, and other milestones. This ensures that users never miss an important date, helping them stay connected and show that they care.

### Extension Features
- **Check-in Streaks**: Gamify consistent communication, rewarding users for maintaining regular contact. This feature encourages users to stay in touch with their loved ones by making it a fun and rewarding activity.
- **Outing Reminders**: Provide relevant information about friends for meaningful conversations. This helps users prepare for social outings and ensures that their interactions are thoughtful and engaging.
- **Daily Prompts**: Offer daily prompts for intentional relationship-building. These prompts inspire users to take small but meaningful actions to strengthen their relationships.
- **Weekly Reflection Prompts**: Encourage self-awareness and introspection with weekly prompts. These prompts help users reflect on their interactions and think about how they can improve their relationships.
- **Reminders to Check In**: Gentle prompts to reach out and maintain regular communication. These reminders help users stay in touch with their loved ones and maintain strong relationships.

## Tech Stack
- **React Native** (FrontEnd): React Native allows us to build a mobile application that works on both iOS and Android platforms using a single codebase. This helps us deliver a consistent experience to all users, regardless of their device.
- **Node.js with Express.js** (BackEnd): Node.js and Express.js enable us to build a scalable and efficient backend for handling API requests and managing data. This ensures that our application performs well and can handle a large number of users.
- **Firestore Database** (Database): Firestore provides a flexible, scalable, and real-time database solution for storing user data. This allows us to deliver a seamless and responsive experience to our users.
- **Firebase Authentication** (Authentication): Firebase Authentication provides secure and reliable user authentication, ensuring that user data is protected and that users can easily sign in and out of the application.
- **Firebase Cloud Messaging** (Cloud Services): Firebase Cloud Messaging allows us to send push notifications to users, ensuring that they receive timely reminders and prompts.
- **React Navigation** (UI Components and Navigation): React Navigation helps us build a user-friendly and intuitive navigation system for the application, making it easy for users to move between different screens and features.
- **Git and GitHub** (Version Control): Git and GitHub enable us to manage our codebase, collaborate effectively, and track changes. This ensures that our development process is smooth and that we can quickly address any issues that arise.

### User Research Samples and Examples

#### Sample 1: Initial Usability Testing

**Objective**: To assess the overall usability of the HeartSprouts app and identify any immediate issues with navigation and key features.

**Participants**: 10 young adults aged 18-25.

**Methodology**:
- Participants were asked to perform a series of tasks, including creating a profile, adding a friend and setting a reminder
- Screen recordings and user input logs were collected.
- Post-test surveys and interviews were conducted to gather qualitative feedback.

**Key Findings**:
1. **Navigation Issues**: Several participants found it difficult to navigate from the Home screen to the Add Friend screen.
   - **Conclusion**: The navigation bar needs clearer icons and labels. We should consider adding a tutorial or onboarding guide for first-time users.

2. **Profile Creation Confusion**: Some users were confused about the steps required to complete the profile creation process.
   - **Conclusion**: Simplify the profile creation process and providing clearer instructions at each step.

3. **Reminder Settings**: Users appreciated the reminder feature but wanted more customization options (e.g., setting specific times for reminders).
   - **Conclusion**: Enhance the reminder feature by allowing users to set specific times and customize reminder messages.

#### Sample 2: Focus Group Discussions

**Objective**: To gain deeper insights into user motivations and preferences for features related to maintaining relationships.

**Participants**: 8 young adults from diverse backgrounds.

**Methodology**:
- Conducted two focus group sessions, each lasting 1.5 hours.
- Participants discussed their experiences with the app, their relationship maintenance habits, and their feature preferences.

**Key Findings**:
1. **Personal Connection**: Users emphasized the importance of features that help them feel more connected on a personal level, such as sharing memories or photos.
   - **Conclusion**: Introduce features that allow users to share photos, notes, and memories with their friends and family members.

2. **Customization**: Participants wanted more ways to customize their experience, such as personalized themes and notification sounds.
   - **Conclusion**: Add customization options for themes, notification sounds, and display preferences to enhance user experience.

3. **Integration with Other Apps**: Users expressed interest in integrating HeartSprouts with other apps like calendars and social media platforms.
   - **Conclusion**: Explore possibilities for integrating with popular calendar apps and social media platforms to provide a seamless experience for users.

4. **Privacy Concerns**: Some participants were concerned about the privacy of their data, particularly personal details of their friends.
   - **Conclusion**: Strengthen privacy policies and provide transparent information on data usage. Implement robust security measures to protect user data.

---

By conducting these user research activities, HeartSprouts can continuously refine and improve its features, ensuring that the app meets the needs and preferences of its target audience.

## Installation
To get started with HeartSprouts, follow these steps:

### Step 1: Install Node.js
Node.js is required to run the development server and manage dependencies. Follow the instructions below to install Node.js on your system:

#### For Windows and macOS:
1. Go to the [Node.js website](https://nodejs.org/).
2. Download the LTS version of Node.js.
3. Run the installer and follow the instructions to complete the installation.

#### For Linux:
1. Open a terminal and run the following commands:
    ```sh
    sudo apt update
    sudo apt install nodejs npm
    ```

### Step 2: Install Expo CLI
Expo CLI is required to build and serve your React Native application. Install it globally using npm:

1. Open a terminal (or command prompt on Windows).
2. Run the following command:
    ```sh
    npm install -g expo-cli
    ```

### Step 3: Install Expo Go
Expo Go is a mobile application that allows you to run your React Native applications on your mobile device. Install Expo Go on your mobile device from the appropriate app store:

#### For Android:
1. Open the Google Play Store.
2. Search for "Expo Go".
3. Install the Expo Go app.

#### For iOS:
1. Open the App Store.
2. Search for "Expo Go".
3. Install the Expo Go app.

### Step 4: Clone the Repository
1. Open a terminal (or command prompt on Windows).
2. Run the following command to clone the repository:
    ```sh
    git clone https://github.com/isaacchua0309/HeartSprouts.git
    ```

### Step 5: Navigate to the Project Directory
1. In the terminal, navigate to the project directory:
    ```sh
    cd HeartSprouts
    ```

### Step 6: Install Dependencies
1. In the project directory, run the following command to install the necessary dependencies:
    ```sh
    npm install
    ```

### Step 7: Start the Development Server
1. Start the development server by running the following command:
    ```sh
    expo start
    ```
2. Follow the instructions in the terminal to open the Expo Go app on your mobile device and scan the QR code to run the application.

## Usage
To use HeartSprouts, follow these steps:

1. **Create an Account**: Open the app and create a new account by following the on-screen instructions. Enter your name, birthday, email, and password to complete the registration process.
2. **Add Friends**: Once logged in, navigate to the "Add Friend" screen to add profiles for your friends and family members. Enter their name, birthday, and any other relevant details.
3. **Set Reminders**: Use the app to set reminders for important dates like birthdays and anniversaries. You can also set regular check-in reminders to stay connected with your loved ones.
4. **Weekly Reflections**: Take a few minutes each week to respond to reflection prompts designed to help you deepen your understanding of your relationships and improve your social connections.
5. **Daily Prompts**: Receive daily prompts to encourage intentional actions or conversations that can strengthen your relationships.
6. **Prepare for Social Outings**: Use the app to receive reminders and relevant information about your friends before social outings, ensuring you have meaningful conversations.

By following these steps, you can leverage HeartSprouts to maintain and foster genuine connections with your friends and family, even amidst the demands of modern life.

## Screens
### GettingStartedScreen
![Getting Started Screen](https://github.com/isaacchua0309/HeartSprouts/blob/main/assets/ReadMe/GettingStartedScreen.jpg)

- **Function**: Welcomes users to HeartSprouts and provides navigation to sign in or continue with onboarding.
- **Key Features**: Navigation to Name Input screen for new users and Login screen for existing users.

### NameInputScreen
![Name Input Screen](https://github.com/isaacchua0309/HeartSprouts/blob/main/assets/ReadMe/NameInputScreen.jpg)

- **Function**: Captures the user's name and navigates to the Birthday Input screen.
- **Key Features**: Input field for

 the user's name, progress bar.

### BirthdayInputScreen
![Birthday Input Screen](https://github.com/isaacchua0309/HeartSprouts/blob/main/assets/ReadMe/BirthdayInputScreen.jpg)
![Birthday Input Screen Failure](https://github.com/isaacchua0309/HeartSprouts/blob/main/assets/ReadMe/BirthdayInputScreenFail.jpg)

- **Function**: Captures the user's birthday and navigates to the Email Input screen.
- **Key Features**: Input field for the user's birthday, date validation, progress bar.

### EmailInputScreen
![Email Input Screen](https://github.com/isaacchua0309/HeartSprouts/blob/main/assets/ReadMe/EmailInputScreen.jpg)
![Email Input Screen Fail](https://github.com/isaacchua0309/HeartSprouts/blob/main/assets/ReadMe/EmailInputScreenFail.jpg)

- **Function**: Captures the user's email and navigates to the Password Input screen.
- **Key Features**: Input field for the user's email, email validation, progress bar.

### PasswordInputScreen
![Password Input Screen](https://github.com/isaacchua0309/HeartSprouts/blob/main/assets/ReadMe/PasswordInputScreen.jpg)
![Password Input Screen Accepted](https://github.com/isaacchua0309/HeartSprouts/blob/main/assets/ReadMe/PasswordInputScreenAccepted.jpg)
![Password Input Screen Showcase](https://github.com/isaacchua0309/HeartSprouts/blob/main/assets/ReadMe/PasswordInputScreenShowcase.jpg)

- **Function**: Captures and validates the user's password and navigates to the account creation success screen.
- **Key Features**: Input field for the password, password strength validation, progress bar.

### CreationSuccessScreen
![Creation Success Screen](https://github.com/isaacchua0309/HeartSprouts/blob/main/assets/ReadMe/CreationSuccessScreen.jpg)

- **Function**: Informs the user that their account has been successfully created and navigates to the Home screen.
- **Key Features**: Success message, navigation to the Home screen.

### LoginScreen
![Login Screen](https://github.com/isaacchua0309/HeartSprouts/blob/main/assets/ReadMe/SignInScreen.jpg)

- **Function**: Allows existing users to log in to their accounts.
- **Key Features**: Input fields for email and password, password visibility toggle, navigation to Home screen upon successful login.

### HomeScreen
![Home Screen](https://github.com/isaacchua0309/HeartSprouts/blob/main/assets/ReadMe/HomeScreen.jpg)

- **Function**: Serves as the main dashboard for the user, allowing them to interact with various features.
- **Key Features**: Search input for saving events, navigation to Users and Home screens, display of user instructions and examples.

### AddFriendScreen
![Add Friend Screen](https://github.com/isaacchua0309/HeartSprouts/blob/main/assets/ReadMe/AddFriendScreen.jpg)
![Add Friend Screen Input](https://github.com/isaacchua0309/HeartSprouts/blob/main/assets/ReadMe/AddFriendScreenInput.jpg)
![Add Friend Screen Rendering](https://github.com/isaacchua0309/HeartSprouts/blob/main/assets/ReadMe/AddFriendScreenRendering.jpg)
![Add Friend Screen Success](https://github.com/isaacchua0309/HeartSprouts/blob/main/assets/ReadMe/AddFriendScreenSuccess.jpg)

- **Function**: Allows users to add new friends to their profile.
- **Key Features**: Input fields for friend's name and birthday, date picker, navigation to Users screen upon successful addition.

### FriendProfileScreen
![Friend Profile Screen](https://github.com/isaacchua0309/HeartSprouts/blob/main/assets/ReadMe/FriendProfileScreen.jpg)
![Friend Profile Screen Event Adding](https://github.com/isaacchua0309/HeartSprouts/blob/main/assets/ReadMe/FriendProfileScreenEventAdding.jpg)
![Friend Profile Screen Date Adding](https://github.com/isaacchua0309/HeartSprouts/blob/main/assets/ReadMe/FriendProfileScreenDateAdding.jpg)
![Friend Profile Screen Event Add Success](https://github.com/isaacchua0309/HeartSprouts/blob/main/assets/ReadMe/FriendProfileScreenEventAddSuccess.jpg)
![Friend Profile Screen Updated](https://github.com/isaacchua0309/HeartSprouts/blob/main/assets/ReadMe/FriendProfileScreenUpdated.jpg)

- **Function**: Displays the profile of a specific friend, including events and other details.
- **Key Features**: Display of friend's information, ability to add and delete events, date picker.

### UserProfilesScreen
![User Profiles Screen](https://github.com/isaacchua0309/HeartSprouts/blob/main/assets/ReadMe/FriendsScreen.jpg)
![User Profiles Screen Updated](https://github.com/isaacchua0309/HeartSprouts/blob/main/assets/ReadMe/FriendProfileScreenUpdated.jpg)

- **Function**: Manages and displays the user's friend profiles.
- **Key Features**: Display of friend profiles, navigation to Friend Profile and Friend Creation screens, setup notifications for events.

---

HeartSprouts is designed to be your personal relationship companion, empowering you to prioritize and nurture your most important connections. We hope this application helps you build a more intentional and fulfilling social life.

For more information, visit our [GitHub repository](https://github.com/isaacchua0309/HeartSprouts) or contact our support team at support@heartsprouts.com.

Happy connecting!