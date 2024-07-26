# HeartSprouts - README

## Introduction

HeartSprouts is an emotional well-being and relationship management application designed to help users nurture their emotional health and maintain meaningful connections with friends and family. The app provides features such as mood tracking, journaling, relationship management, and event reminders, all wrapped in an engaging and user-friendly interface.

## Table of Contents
- [Motivation](#motivation)
- [Aim](#aim)
- [User Stories](#user-stories)
- [Features](#features)
- [Architecture](#architecture)
- [Installation](#installation)
- [Usage](#usage)
- [Testing](#testing)
- [User Research Samples and Examples](#user-research-samples-and-examples)
- [Version Control](#version-control)
- [Design Principles and Patterns](#design-principles-and-patterns)
- [Contribution](#contribution)
- [License](#license)
- [Acknowledgements](#acknowledgements)

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

HeartSprouts implements several complex features designed to enhance the user experience and provide comprehensive emotional and relationship management tools.

### 1. User Authentication and Account Management
- **Screens:** LoginScreen.js, ResetPasswordScreen.js, GettingStartedScreen.js, NameInputScreen.js, BirthdayInputScreen.js, EmailInputScreen.js, PasswordInputScreen.js
- **Description:** Implements user sign-up, login, and password reset functionalities using Firebase Authentication. The screens guide users through the process of creating an account, setting a password with specific criteria, and handling password recovery via email.
- **Technical Implementation:**
  - **Firebase Authentication:** Handles user authentication and account management.
  - **Multi-step Form Validation:** Ensures data integrity during account creation.
- **Screenshots:**
  ![Login Screen](assets/ReadMe/FlowDiagrams/screenshots/LoginScreen.png)
  ![Logout Modal](assets/ReadMe/FlowDiagrams/screenshots/LogoutScreen.png)
  ![Account Creation](screenshots/account_creation.png)

### 2. User Profile and Settings Management
- **Screens:** ProfileModal.js, SettingsModal.js
- **Description:** Allows users manage account settings, logout, answer FAQs and send feedback to developers
- **Technical Implementation:**
  - **Modular Components:** Reusable components for profile and settings management.
- **Screenshots:**
  ![Profile Modal](assets/ReadMe/FlowDiagrams/screenshots/ProfileSettingsScreen.png)

### 3. Mood Tracking and Emotional Insights
- **Screens:** HomeScreen.js, MoodOverlay.js
- **Description:** Enables users to track their mood by selecting from predefined emotions. The selected mood influences the display of motivational quotes and changes the appearance of the pet image based on the user's level.
- **Technical Implementation:**
  - **Mood Overlay Component:** Provides an interface for selecting and displaying mood-related information.
- **Screenshots:**
  ![Mood Overlay](assets/ReadMe/FlowDiagrams/screenshots/HomeScreenLevel2.png)
  ![Mood Overlay](assets/ReadMe/FlowDiagrams/screenshots/HomeScreenLevel2.png)
  ![Mood Picking Modal](assets/ReadMe/FlowDiagrams/screenshots/MoodPickerScreen.png)

### 4. Journal and Weekly Reflection
- **Screens:** WeeklyReflectionScreen.js, PromptAnswerScreen.js, SatisfactionRatingScreen.js, RelationshipSatisfiedScreen.js
- **Description:** Provides a journaling feature with weekly prompts. Users rate their relationship satisfaction, select key relationships, and answer reflective questions. The app tracks journal entries and relationship satisfaction over time, displaying trends and insights.
- **Technical Implementation:**
  - **Firestore:** Stores journal entries and relationship satisfaction data.
  - **Weekly Prompt System:** Generates and manages weekly prompts for users.
- **Screenshots:**
  ![Main Journal Screen](assets/ReadMe/FlowDiagrams/screenshots/MainJournalScreen.png)
  ![Journal Entries View](assets/ReadMe/FlowDiagrams/screenshots/ViewJournalEntriesScreen.png)
  ![Satisfaction Inquiry Screen](assets/ReadMe/FlowDiagrams/screenshots/HowSatisfiedScreen.png)
  ![Friend Highlights Screen](assets/ReadMe/FlowDiagrams/screenshots/PickTopFriendsScreen.png)
  ![Journal Entry](assets/ReadMe/FlowDiagrams/screenshots/WriteAnswerScreen.png)
  ![Journal Prompt Success Screen](assets/ReadMe/FlowDiagrams/screenshots/SuccessfulAddJournalEntry.png)

### 5. Event and Relationship Management
- **Screens:** UserProfilesScreen.js, AddFriendScreen.js, FriendProfileScreen.js, RelationshipSatisfiedScreen.js
- **Description:** Manages user relationships by allowing them to add friends, view and edit friend profiles, and record events such as birthdays and anniversaries. The app schedules notifications for upcoming events and tracks interactions with friends.
- **Technical Implementation:**
  - **Firestore:** Stores friend profiles and events.
  - **Event Scheduler:** Manages and schedules notifications for events.
- **Screenshots:**
  ![Add Event Screen](assets/ReadMe/FlowDiagrams/screenshots/AddEventScreen.png)
  ![New Friend Screen](assets/ReadMe/FlowDiagrams/screenshots/AddNewProfileScreen.png)
  ![Delete friend Screen](assets/ReadMe/FlowDiagrams/screenshots/DeleteFriendProfileScreen.png)
  ![Edit friend Screen](assets/ReadMe/FlowDiagrams/screenshots/FriendProfileScreen.png)
  ![Relationship Manager Screen](assets/ReadMe/FlowDiagrams/screenshots/RelationshipManagerScreen.png)
  ![Upcoming Events Screen](assets/ReadMe/FlowDiagrams/screenshots/UpcomingEventsScreen.png)
  ![Journal Prompt Success Screen](assets/ReadMe/FlowDiagrams/screenshots/SuccessfulAddJournalEntry.png)
  ![Journal Prompt Success Screen](assets/ReadMe/FlowDiagrams/screenshots/SuccessfulAddJournalEntry.png)

### 6. Notifications and Reminders
- **Screens:** LoginScreen.js, HomeScreen.js, ProfileModal.js, SettingsModal.js
- **Description:** Schedules notifications for important events and reminders based on user interactions and relationships. The app ensures users receive timely notifications about upcoming events with friends, weekly journal prompts, and mood tracking.
- **Technical Implementation:**
  - **Firebase Cloud Messaging:** Manages notifications.
  - **Notification Scheduler:** Ensures timely notifications for events and prompts.
- **Screenshots:**


### 7. Experience Points and Leveling System
- **Screens:** ExperienceBar.js, HomeScreen.js
- **Description:** Implements an experience points (XP) system where users earn XP by tracking their mood, completing journal prompts, and engaging with the app. The XP system is visualized through an experience bar, and users level up, unlocking new features and visual changes in their pet image.
- **Technical Implementation:**
  - **XP Tracking:** Manages and updates user XP.
  - **Level System:** Determines user level based on XP and updates visuals accordingly.
- **Screenshots:**
  ![Experience Bar](assets/ReadMe/FlowDiagrams/screenshots/HomeScreenLevel2.png)

### 8. Help and Support Features
- **Screens:** FAQModal.js, ContactUsModal.js
- **Description:** Provides a comprehensive FAQ section to help users navigate the app and understand its features. The ContactUsModal allows users to send feedback or request support directly from the app, ensuring users have access to assistance when needed.
- **Technical Implementation:**
  - **FAQ Management:** Stores and displays FAQ content.
  - **Contact Form:** Manages user feedback and support requests.
- **Screenshots:**
  ![FAQ Modal](assets/ReadMe/FlowDiagrams/screenshots/FAQScreen1.png)
  ![FAQ Modal](assets/ReadMe/FlowDiagrams/screenshots/FAQScreen2.png)
  ![Contact Us Modal](assets/ReadMe/FlowDiagrams/screenshots/ContactUsScreen.png)

## Architecture

### High-Level Architecture

HeartSprouts follows a modular architecture, separating concerns into distinct components and leveraging best practices for maintainability and scalability.

- **React Native:** For building cross-platform mobile applications.
- **Firebase:** Backend services including Authentication, Firestore for data storage, and Cloud Functions.
- **Expo:** Development platform for building and deploying React Native applications.
- **Redux:** State management library for managing app state.
- **React Navigation:** Navigation library for managing screen transitions.

### Flow and Architecture Design

#### User Authentication Flow
1. User opens the app and is presented with the LoginScreen.
2. If the user does not have an account, they navigate to the GettingStartedScreen and follow the steps to create an account.
3. Upon successful account creation, the user is redirected to the HomeScreen.

![User Authentication Flow](assets/ReadMe/FlowDiagrams/flowdiagrams/UserAuthenticationFlow.jpeg)

#### New Friend Event Creation Flow
1. User opens the app and navigates to the UserProfilesScreen.
2. User selects a friend from the UserProfilesScreen.
3. User is directed to the FriendProfileScreen.
4. User clicks the "Add Event" button on the FriendProfileScreen.
5. User is directed to the CreateEvent modal.
6. User fills in the event details (e.g., name, date, location, description) in the CreateEvent

 modal.
7. User reviews and confirms the event details.
8. Event details are stored in Firestore.
9. A confirmation message and event details are displayed to the user.

![New Friend Event Creation Flow](assets/ReadMe/FlowDiagrams/flowdiagrams/NewEventCreationFlow.jpeg)

#### New Friend Creation Flow
1. User opens the app and navigates to the UserProfilesScreen.
2. User clicks the "Add Friend" button.
3. User is directed to the AddFriendScreen.
4. User fills in the friend's details (e.g., name, contact information) in the AddFriendScreen.
5. User reviews and confirms the friend's details.
6. New friend's data is stored in Firestore.
7. A confirmation message is displayed to the user.

![New Friend Creation Flow](assets/ReadMe/FlowDiagrams/flowdiagrams/NewFriendCreationFlow.jpeg)

#### Edit Friend Details Flow
1. User opens the app and navigates to the UserProfilesScreen.
2. User selects a friend from the UserProfilesScreen.
3. User is directed to the FriendProfileScreen.
4. User clicks the "Edit Details" button on the FriendProfileScreen.
5. User is directed to the EditFriendDetails modal.
6. User edits the friend's details (e.g., name, contact information) in the EditFriendDetails modal.
7. User reviews and confirms the updated details.
8. Updated friend's data is stored in Firestore.
9. A confirmation message is displayed to the user.

![Edit Friend Details Flow](assets/ReadMe/FlowDiagrams/flowdiagrams/EditFriendDetailsFlow.jpeg)

#### Log Out Flow
1. User opens the app and navigates to the HomeScreen.
2. User opens the profile modal from the HomeScreen.
3. User presses the "Log Out" button in the profile modal.
4. User confirms the log out action via a confirmation dialog.
5. The application logs the user out and clears the session data.
6. User is redirected to the LoginScreen.

![Log Out Flow](assets/ReadMe/FlowDiagrams/flowdiagrams/LogoutFlow.jpeg)

#### Journal and Weekly Reflection Flow
1. User receives a weekly prompt on the WeeklyReflectionScreen.
2. User rates their relationship satisfaction on the SatisfactionRatingScreen.
3. User selects key relationships on the RelationshipSatisfiedScreen.
4. User answers the weekly prompt on the PromptAnswerScreen.
5. Journal entries and ratings are stored in Firestore and displayed in the WeeklyReflectionScreen.

![Journal and Weekly Reflection Flow](assets/ReadMe/FlowDiagrams/flowdiagrams/WeeklyJournalEntryFlow.jpeg)

### Entity-Relationship Diagram

![Entity-Relationship Diagram](assets/ReadMe/FlowDiagrams/flowdiagrams/Entity.jpeg)

## Installation

To run HeartSprouts locally, follow these steps:

1. **Clone the repository:**
   ```sh
   git clone https://github.com/your-username/HeartSprouts.git
   cd HeartSprouts
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Set up Firebase:**
   - Create a Firebase project.
   - Configure Authentication, Firestore, and Cloud Functions.
   - Replace the Firebase configuration in `firebaseHelper.js` with your project’s configuration.

4. **Run the app:**
   ```sh
   expo start
   ```

## Usage

### Running the App

1. **Start the development server:**
   ```sh
   expo start
   ```

2. **Launch the app on a simulator or physical device:**
   - For iOS: Use the Expo Go app.
   - For Android: Use the Expo Go app or an Android emulator.

3. **Navigate through the app:**
   - **Login:** Sign in or create a new account.
   - **Home:** Track your mood and view motivational quotes.
   - **Journal:** Answer weekly prompts and track relationship satisfaction.
   - **Friends:** Add and manage friend profiles and events.

## Testing

### Testing Strategy

HeartSprouts uses a comprehensive testing strategy to ensure robustness and reliability:

#### Automated Testing

1. **Unit Testing:**
   - **Framework:** Jest
   - **Description:** Tests individual functions and components.
   - **Example:**
     ```jsx
     import { render, screen } from '@testing-library/react-native';
     import HomeScreen from '../HomeScreen';

     test('renders home screen', () => {
       render(<HomeScreen />);
       const textElement = screen.getByText(/Welcome to HeartSprouts/i);
       expect(textElement).toBeInTheDocument();
     });
     ```

2. **Integration Testing:**
   - **Framework:** Jest with React Native Testing Library
   - **Description:** Tests interactions between different parts of the app.
   - **Example:**
     ```jsx
     import { render, fireEvent } from '@testing-library/react-native';
     import AddFriendScreen from '../AddFriendScreen';

     test('adds a new friend', () => {
       const { getByPlaceholderText, getByText } = render(<AddFriendScreen />);
       fireEvent.changeText(getByPlaceholderText('Friend Name'), 'John Doe');
       fireEvent.press(getByText('Add Friend'));
       expect(getByText('John Doe')).toBeInTheDocument();
     });
     ```

3. **End-to-End (E2E) Testing:**
   - **Framework:** Detox
   - **Description:** Simulates real user interactions and tests full app workflows.
   - **Example:**
     ```sh
     describe('Login Flow', () => {
       beforeAll(async () => {
         await device.launchApp();
       });

       it('should login successfully', async () => {
         await element(by.id('email')).typeText('test@example.com');
         await element(by.id('password')).typeText('password');
         await element(by.id('loginButton')).tap();
         await expect(element(by.id('homeScreen'))).toBeVisible();
       });
     });
     ```

4. **Automated UI Testing:**
   - **Framework:** Jest with React Native Testing Library
   - **Description:** Verifies UI components render correctly and respond to inputs.
   - **Example:**
     ```jsx
     import { render, fireEvent } from '@testing-library/react-native';
     import ProfileModal from '../ProfileModal';

     test('opens profile modal', () => {
       const { getByText } = render(<ProfileModal />);
       fireEvent.press(getByText('Edit Profile'));
       expect(getByText('Save Changes')).toBeInTheDocument();
     });
     ```

### Manual Testing

1. **Exploratory Testing:**
   - **Description:** Manual testing to find issues not covered by automated tests. Testers explore the app to identify potential usability issues and bugs.

2. **Usability Testing:**
   - **Description:** Ensures the app is user-friendly and intuitive. Conducted with real users to gather feedback and identify areas for improvement.

### Continuous Integration

HeartSprouts uses continuous integration (CI) to automate testing and deployment:

- **CI Tools:** CircleCI, Travis CI
- **Description:** Automatically runs tests on code changes and deploys to staging/production environments.

### Testing Evidence

#### Test Case Documentation

- **Unit Tests:** 50+ unit tests covering core functionalities.
- **Integration Tests:** 20+ integration tests ensuring module interactions.
- **E2E Tests:** 10+ E2E tests covering critical user flows.

#### Screenshots of Test Runs

![Unit Test Results](screenshots/unit_test_results.png)
![E2E Test Results](screenshots/e2e_test_results.png)

## User Research Samples and Examples

### Sample 1: Initial Usability Testing

**Objective**: To assess the overall usability of the HeartSprouts app and identify any immediate issues with navigation and key features.

**Participants**: 10 young adults aged 18-25.

**Methodology**:
- Participants were asked to perform a series of tasks, including creating a profile, adding a friend, and setting a reminder.
- Screen recordings and user input logs were collected.
- Post-test surveys and interviews were conducted to gather qualitative feedback.

**Key Findings**:
1. **Navigation Issues**: Several participants found it difficult to navigate from the Home screen to the Add Friend screen.
   - **Conclusion**: The navigation bar needs clearer icons and labels. We should consider adding a tutorial or onboarding guide for first-time users.

2. **Profile Creation Confusion**: Some users were confused about the steps required to complete the profile creation process.
   - **Conclusion**: Simplify the profile creation process and provide clearer instructions at each step.

3. **Reminder Settings**: Users appreciated the reminder feature but wanted more customization options (e.g., setting specific times for reminders).
   - **Conclusion**: Enhance the reminder feature by allowing users to set specific times and customize reminder messages.

### Sample 2: Focus Group Discussions

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
   - **Conclusion**: Explore possibilities for integrating with popular calendar apps and social media platforms to provide a seamless experience for users

.

4. **Privacy Concerns**: Some participants were concerned about the privacy of their data, particularly personal details of their friends.
   - **Conclusion**: Strengthen privacy policies and provide transparent information on data usage. Implement robust security measures to protect user data.

By conducting these user research activities, HeartSprouts can continuously refine and improve its features, ensuring that the app meets the needs and preferences of its target audience.

## Version Control

### GitHub Workflow

HeartSprouts uses GitHub for version control, following best practices to ensure code quality and collaboration.

#### Branching Strategy

- **Main Branch:** The stable version of the app.
- **Develop Branch:** The latest development changes.
- **Feature Branches:** Separate branches for each feature or bug fix.
  - Naming Convention: `feature/feature-name`, `bugfix/issue-id-description`

#### Pull Requests

- **Process:**
  - Developers create pull requests from feature branches to the develop branch.
  - Pull requests include detailed descriptions, screenshots, and related issue numbers.
  - Code reviews are conducted by at least two team members before merging.

#### Commit Messages

- **Format:** `[Type] Short description (issue-id)`
  - Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`
  - Example: `[feat] Add mood tracking feature (issue-123)`

## Design Principles and Patterns

HeartSprouts follows several software design principles and patterns to ensure maintainability, scalability, and robustness.

### SOLID Principles

1. **Single Responsibility Principle (SRP):**
   - **Description:** A class should have one and only one reason to change.
   - **Implementation:** Each screen and component in HeartSprouts has a specific responsibility.

2. **Open/Closed Principle (OCP):**
   - **Description:** Software entities should be open for extension but closed for modification.
   - **Implementation:** Use of abstract classes and interfaces to allow extension without modifying existing code.

3. **Liskov Substitution Principle (LSP):**
   - **Description:** Objects of a superclass should be replaceable with objects of a subclass without affecting the functionality.
   - **Implementation:** Ensuring subclass implementations maintain the behavior expected by the superclass.

4. **Interface Segregation Principle (ISP):**
   - **Description:** Clients should not be forced to depend upon interfaces that they do not use.
   - **Implementation:** Creating specific interfaces for different functionalities.

5. **Dependency Inversion Principle (DIP):**
   - **Description:** High-level modules should not depend on low-level modules but on abstractions.
   - **Implementation:** Use of dependency injection and inversion of control (IoC) containers.

### Other Principles

1. **DRY (Don't Repeat Yourself):**
   - **Description:** Avoid code duplication by abstracting common functionality.
   - **Implementation:** Shared components and utility functions.

2. **KISS (Keep It Simple, Stupid):**
   - **Description:** Keep the code as simple as possible.
   - **Implementation:** Simple and readable code with clear documentation.

3. **YAGNI (You Ain't Gonna Need It):**
   - **Description:** Only implement features when they are needed.
   - **Implementation:** Incremental development and avoiding over-engineering.

### Design Patterns

1. **Factory Method:**
   - **Usage:** Creating different types of user accounts and events.
   - **Example:** `createAccount` function to generate user profiles.

2. **Observer Pattern:**
   - **Usage:** Notifying users of changes in mood tracking or journal entries.
   - **Example:** Real-time updates on mood changes.

3. **Singleton Pattern:**
   - **Usage:** Ensuring a single instance of the Firebase connection.
   - **Example:** Firebase configuration module.

4. **Decorator Pattern:**
   - **Usage:** Adding additional functionality to components without modifying their code.
   - **Example:** Enhancing UI components with additional styles or behaviors.

5. **Facade Pattern:**
   - **Usage:** Simplifying interactions with complex subsystems.
   - **Example:** A single API for managing user profiles and events.

6. **Strategy Pattern:**
   - **Usage:** Defining different algorithms for user interactions.
   - **Example:** Different strategies for handling user inputs and navigation.

### Diagrams and Documentation

#### Activity Flow Diagram

![Activity Flow Diagram](assets/ReadMe/FlowDiagrams/flowdiagrams/ActivityFlowDiagram.jpeg)

## Contribution

We welcome contributions to HeartSprouts! To contribute, follow these steps:

1. **Fork the repository.**
2. **Create a new branch:**
   ```sh
   git checkout -b feature/your-feature-name
   ```
3. **Make your changes and commit them:**
   ```sh
   git commit -m 'Add some feature'
   ```
4. **Push to the branch:**
   ```sh
   git push origin feature/your-feature-name
   ```
5. **Create a pull request.**

## License

HeartSprouts is licensed under the MIT License. See the LICENSE file for more information.

## Acknowledgements

We thank all the contributors and the open-source community for their valuable contributions.

---

By following best practices in software engineering, including a modular architecture, comprehensive testing, and continuous integration, HeartSprouts aims to provide a reliable and user-friendly experience for managing emotional well-being and relationships.