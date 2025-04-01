export default function(sequelize, DataTypes) {
  const Task = sequelize.define(
    'Task',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4, // Or DataTypes.UUIDV1
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
      },
      priority: {
        type: DataTypes.ENUM,
        allowNull: false,
        values: ['low', 'medium', 'high'],
      },
      dueDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM,
        allowNull: false,
        defaultValue: 'pending',
        values: ['pending', 'completed'],
      },
    },
    {
      paranoid: true, // Enables soft deletes
    },
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
