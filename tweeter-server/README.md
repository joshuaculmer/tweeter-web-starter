## On Git push

Make sure you update the node_modules anytime you change dependencies in the mode_modules and nodejs. Those updates need to be put into tweeter-server/layer/nodejs/node_modules everytime anything changes with that. Just delete the old one and copy the current node_modules into it.

## Using Sam

Download and configure AWS CLI first [here](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/prerequisites.html)

Download and install AWS SAM CLI [here](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/install-sam-cli.html). Check that you downloaded and installed both correctly with AWS --version and sam --version. If you're running linux or a linux based shell such as git Bash, then you may need to call sam.cmd --version instead since it might not recognize the cmd file type.

You'll need to make a [samconfig.toml](https://github.com/BYU-CS-340/softwaredesign/blob/main/tweeter/milestone-3/tweeter-samconfig.md) and a [template.yaml](https://github.com/BYU-CS-340/softwaredesign/blob/main/tweeter/milestone-3/tweeter-template.md). Make sure to configure those files properly with your information, such as what S3 bucket you're using.

The rest of the instruction is [here](https://github.com/BYU-CS-340/softwaredesign/blob/main/tweeter/milestone-3/automating-aws-resource-management.md)

## 14 Web API endpoints

### Follow Service

- [x] GetFollowees
- [x] GetFollowers

### Auth

- [ ] Login
- [ ] Register
- [ ] Logout

### Status

- [ ] LoadMoreFeedItems
- [ ] LoadMoreStoryItems
- [ ] PostStatus

### User

- [x] GetUser
- [x] GetIsFollowerStatus
- [x] GetFolloweeCount
- [x] GetFollowerCount
- [x] Unfollow
- [x] Follow
