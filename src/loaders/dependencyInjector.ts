import { Container } from "typedi";

export default ({
  //sequelizeSchemas,
  controllers,
  repos,
  services,
}: {
  //sequelizeSchemas: { name: string; sequelizeSchema: any }[];
  controllers: { name: string; path: string }[];
  repos: { name: string; path: string }[];
  services: { name: string; path: string }[];
}) => {
  try {
    /*sequelizeSchemas.forEach((m) => {
      // Notice the require syntax and the '.default'
      let schema = require(m.sequelizeSchema).default;
      Container.set(m.name, schema);
    });*/

    repos.forEach((m) => {
      let repoClass = require(m.path).default;
      let repoInstance = Container.get(repoClass);
      Container.set(m.name, repoInstance);
    });

    services.forEach((m) => {
      let serviceClass = require(m.path).default;
      let serviceInstance = Container.get(serviceClass);
      Container.set(m.name, serviceInstance);
    });

    controllers.forEach((m) => {
      // load the @Service() class by its path
      let controllerClass = require(m.path).default;
      // create/get the instance of the @Service() class
      let controllerInstance = Container.get(controllerClass);
      // rename the instance inside the container
      Container.set(m.name, controllerInstance);
    });

    return;
  } catch (e) {
    console.error(e);
    throw e;
  }
};
