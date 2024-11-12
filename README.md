# PlantCatalog

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.2.6.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

## Description
This Angular application is designed to display a list of plants, retrieved from a backend API, and showcase each plant using a card layout.

Key Features of the Application
Plant List Display: The main component, PlantListComponent, fetches and displays a list of plants. Each plant is rendered in a reusable card component, CommonCardComponent, which shows individual plant details.

Data Fetching and Pagination: The application fetches plant data from an API through the PlantService. Pagination is implemented so users can load more plants as needed. Each time new data is fetched, it is appended to the existing list of plants, providing a continuous feed of plant information.

Error Handling and Loading States: The application gracefully handles loading and error states. If there’s a network error, an error message is displayed, informing the user of the issue. While data is loading, a loading message or animation can be shown.

Reactive Programming with Observables: This app leverages Angular's async pipe and reactive programming with observables for clean and memory-safe data management. Instead of manually subscribing to the data, the application uses observables and Angular's async pipe, which automatically manages subscriptions and unsubscriptions.

Refresh and Reset Functionality: The user can refresh the plant list, which resets pagination and reloads data from the beginning.

How It Works
The PlantListComponent initializes by triggering a data load on startup. It manages the fetched data with a reactive observable stream (plants$), which allows it to accumulate and display paginated results. The data pipeline is flexible and resilient, handling errors and pagination gracefully while ensuring the UI stays up-to-date without manual subscription management. The application's structure makes it both performant and maintainable.








Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
