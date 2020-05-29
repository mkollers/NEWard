# body LIFE NEWard
This is the home of all the source code belonging to the body LIFE NEWard.

## Development Process
**Coding Conventions**  
All apps and services should be built as cloud-native applications with the twelve-factor app approach in mind. Please read it, it’s very helpful! https://12factor.net/ 

**Branching model**  
As the source-control branching model, “Trunk Based Development” is used. This means, that there is one “trunk”, where all developers collaborate on. This trunk ist the master-branch, which is protected against changes. Changes can not be pushed to it, only Pull Requests are possible. This is the scaled version of the trunk based branching model.

This enforces the developers to create separate branches for their features, bug-fixes and other changes. Those branches should be very short-living. Changes should always be split into the smallest possible pieces, that we are able to release in very short iterations. Short iterations mean multiple releases a day!

**Pull Requests**  
During opening a Pull Request (PR), you are able to set a name and a description. Sometimes the name field is enough, but most of the time some additional information in the description is useful for the reviewer and documentation of the change. The name always has to be meaningful and easy to understand!
- PR has a meaningful name
- PR doesn’t need a description / has a meaningful description

PRs will trigger builds, which will report their status to the source control. To merge a pull request, all these automatic checks have to be successful, and at least one reviewer has approved the request. Every reviewer is responsible for the quality of the PR - code quality and feature quality! 
- Only feature/fix related files have changed
- The Coding conventions are respected
- The coding style guide is respected
- Branch coverage is 100% or is not required (with a good reason)
- All automated checks passed successfully
- The functional requirements were implemented correctly

After approving the PR, the creator is responsible for merging and deleting the branch. The merge commit should be named meaningful like “#92 Fixed memory leak in XXX”, and not with the standard “Merge pull request #92 from XXX” or "Dev to Master". At the end of the meaningful name, the number of the PR should be added in brackets. If useful, a description should also be added. The branch should be deleted as fast as possible to avoid a messy branch list.
- Meaningful commit name
- Name contains the PR number 
- Commit description if useful
- Branch is deleted
