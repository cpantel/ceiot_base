module.exports = (sequelize, Sequelize) => {
  const Rule = sequelize.define("rules", {
    name: {
      type: Sequelize.STRING
    },
    topic: {
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.STRING
    },
    is_enabled: {
      type: Sequelize.BOOLEAN
    },
    activation_value: {
      type: Sequelize.STRING
    },
    duration: {
      type: Sequelize.INTEGER
    }
  });

  return Rule;
};
