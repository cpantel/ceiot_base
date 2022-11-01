module.exports = (sequelize, Sequelize) => {
  const Action = sequelize.define("actions", {
    name: {
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.STRING
    },
    topic: {
      type: Sequelize.STRING
    },
    min_activation_time: {
      type: Sequelize.INTEGER
    },
    activation_value: {
      type: Sequelize.STRING
    },
    cancellation_value: {
      type: Sequelize.STRING
    }
  });

  return Action;
};
