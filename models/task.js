export default function (sequelize, DataTypes) {
  const Task = sequelize.define(
    'Task',
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
      },
      priority: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'low',
        validate: {
          isIn: [['low', 'medium', 'high']],
        },
      },
      dueDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'pending',
        validate: {
          isIn: [['pending', 'completed']],
        },
      },
    },
    {}
  );

  Task.associate = (models) => {
    Task.belongsTo(models.User, {
      foreignKey: {
        fieldName: 'userId',
      },
    });
  };

  return Task;
}
