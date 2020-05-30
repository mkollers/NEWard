# NEWard frontend
This is the source code for the web frontend of the body LIFE NEWard.  

## Build, run, scaffold and test

**Start locally**  
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.  

**Code scaffolding**  
Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

**Build**  
Run `npm run build` to build the project. The build artifacts will be stored in the `dist/` directory.

**Running unit tests**  
Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).
If you run `npm test`, the tests will be executed once and a code coverage summary will be generated in the `coverage/` directory.

**Running end-to-end tests**  
Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Coding Conventions
All apps and services should be built as cloud-native applications with the twelve-factor app approach in mind. Please read it, it’s very helpful! https://12factor.net/ 

**Configuration**  
Important ruleschecklist for configuration:
- credentials have never been committed to the repository!
- if credentials have been committed, they must be changed immediately!
- environment specific configurations loaded through environment variables 

**Structure & lazy loading & data responsibility**  
The Code is split into two areas: “pages” and “shared”. Every page, which can be loaded independently should be inside the pages section. It is possible to divide this folder into more subfolders which are grouping pages, like “auth”, “common”, or a feature-set. All of these pages should be loaded lazily with the angular router, to avoid loading too much data to the client, which can be critical on devices with a bad bandwidth.

These pages are also responsible for loading and managing the data. Data should be initially loaded via a resolver to be able to show a loading indicator. If the data is loaded inside of the page or the component, the view has a flickering effect, because the data will appear step by step. All actions should be handled inside the pages too. If an action is fired inside a sub-component, it should be popped up to the page with the help of an event-emitter. There are just some small exceptions, where it makes sense to load data lazily inside a sub-component - for example lazy loading some images.

**3rd party components**  
We should be really careful with the use of external libraries because they can blow up the bundle size. For example, angular-material should be always imported via deep paths, otherwise, all components will be bundled into the output. Or lodash should only be imported like “import keyBy from ‘lodash/keyBy’”, otherwise the whole lodash library will be bundled into our output. Valid packages are at the moment: 
- @angular/material
- @angular/cdk
- lodash
- moment
- angular2-text-mask

**Mobile-first & Cross Browser**  
Each screen has to be developed mobile-first. No change is allowed to become productive without a clean responsive design for every viewport width from 320px up to 3.840px (4k).  
It is also required to verify, that the change is working on every relevant (TBD) browser and device, with the help of BrowserStack. Preferred way: Automated tests

**Accessibility / Usability**  
Every page should be designed for maximum usability, including handicapped persons. This means, that the page has to be checked for tab orders, autocomplete suggestions and aria labels.

**Global variables**  
Global variables are a very bad design approach. The next developer who wants to change something on your code, in just one little function will be afraid of breaking something else, or just breaking it. To make the code easy to understand, and solid against breaking changes, global variables should be used as less as possible. This also makes unit testing a lot easier.

**Subscribe**  
Subscribing observables is really dangerous. If it is a hot observable, like everything in ActivatedRoute, this will create a potential memory leak. That’s the reason why the preferred way should always be to use the async pipe in the HTML template. If this is not possible, a subscribe must always contain a takeWhile- or takeUntil-operator inside of its pipe. Usually, this is solved by observing the “OnDestroy”-hook and unsubscribing the subscription in case of component destruction.

**Snapshot of ActivatedRoute**  
Using the snapshot of a route inside of the constructor is the first intention everyone of us has. But it can create some crucial side effects. For example, if just a query parameter changes via code (for example with an action like next/previous item), angular is brilliant enough the no re-render the component. That is really cool, but it means, the constructor is not passed again, and your logic will not getting executed again. That’s the reason, why using the observable of ActivatedRoute should always be the preferred way because the observable will be emitted again.

**Units**  
Please always use `rem` or `em` instead of `px` - it improves the accessibility for users with disadvantages. https://engageinteractive.co.uk/blog/em-vs-rem-vs-px

**Unit Tests**  
The default generated spec files from the angular CLI are integration tests, because they are testing the whole component, service, pipe, etc. Beside the typescript code, they are testing dependency injection, html rendering, livecycle hooks and so on. This results in very complex tests, which can have a lot of side effects and are very slow. This is the reason why we should mainly create real unit tests, which are creating classes in the traditional way, without TestBed and the angular testing framework.  
Integration tests are also fine and should be written if useful, but first of all a solid unit test base is required. 
