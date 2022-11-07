exports.initial = (action, rule) => {

  /*
        ACTIONS
  */
  action.create({
    name: "Test action number one",
    description: "Test action number one",
    topic: "/alarm",
    min_activation_time: "10",
    activation_value: "on",
    cancellation_value: "off"
  });

  action.create({
    name: "Test action number two",
    description: "Test action number two",
    topic: "/led",
    min_activation_time: "20",
    activation_value: "on",
    cancellation_value: "off"
  });

  action.create({
    name: "Test action number three",
    description: "Erasable test action",
    topic: "/led",
    min_activation_time: "15",
    activation_value: "on",
    cancellation_value: "off"
  });


  /*
        RULES
  */
  rule.create( {
    name: "Rule number one",
    description: "Rule number one",
    topic: "/sensor",
    duration: 30,
    is_enabled: true,
    activation_value: "xx",
  }).then(rule => {
          rule.setAction(1)
  });
  rule.create( {
    name: "Rule number two",
    description: "Rule number two",
    topic: "/switch",
    duration: 5,
    is_enabled: true,
    activation_value: "xx",
  }).then(rule => {
          rule.setAction(2)
  });

  rule.create( {
    name: "Modifiable Rule",
    description: "Modifiable rule",
    topic: "/switch",
    duration: 5,
    is_enabled: true,
    activation_value: "xx",
  }).then(rule => {
          rule.setAction(1)
  });

  rule.create( {
    name: "Erasable rule",
    description: "Erasable rule",
    topic: "/switch",
    duration: 5,
    is_enabled: true,
    activation_value: "xx",
  }).then(rule => {
          rule.setAction(1)
  });

}
