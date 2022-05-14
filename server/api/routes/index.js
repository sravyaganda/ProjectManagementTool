import userStoryRouter from './user-stories.js';
import userRoute from './user-route.js';
import projectsRoute from './projects.js';
import membersRoute from './member-route.js';

// Fetch routes
export default (app) => {
  app.use('/users', userRoute);
  app.use('/projects', projectsRoute);
  app.use('/userStories', userStoryRouter);
  app.use('/members', membersRoute);
};
