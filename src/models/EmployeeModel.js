const sequelize = require("../lib/db/postgres/connection");
const { DataTypes: dt } = require("sequelize");

const EmployeeModel = sequelize.define(
  "EmployeeModel",
  {
    eeid: {
      type: dt.STRING,
      allowNull: false,
      field: "eeid",
    },

    name: {
      type: dt.STRING,
      field: "full_name",
    },

    job: {
      type: dt.STRING,
      allowNull: false,
      field: "job_title",
    },

    department: {
      type: dt.STRING,
      field: "department",
    },

    businessUnit: {
      type: dt.STRING,
      field: "business_unit",
    },

    gender: {
      type: dt.ENUM("male", "female", "other"),
      field: "gender",
    },

    ethnicity: {
      type: dt.STRING,
      field: "ethnicity",
    },

    age: {
      type: dt.INTEGER,
      field: "age",
      validate: {
        min: 18,
        max: 99,
      },
    },

    annualSalary: {
      type: dt.FLOAT,
      field: "annual_salary",
    },

    bonus: {
      type: dt.FLOAT,
      field: "bonus",
    },

    hireDate: {
      type: dt.DATEONLY,
      field: "hire_date",
      validate: {
        isBefore: dt.NOW,
      },
    },

    exitDate: {
      type: dt.DATEONLY,
      field: "hire_date",
    },

    country: {
      type: dt.STRING,
      field: "country",
    },

    city: {
      type: dt.STRING,
      field: "city",
    },
  },
  {
    tableName: "tb_employee",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

module.exports = EmployeeModel;
