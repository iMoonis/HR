import axios from "axios";
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    employees: [],
    editEmployee: [],
    fields: [],
  },
  actions: {
    async loadEmployees({ commit }) {
      await axios
        .get("http://localhost:3000/employees")
        .then((data) => {
          let employees = data.data;
          commit("SET_EMPLOYEES", employees);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async loadFields({ commit }) {
      await axios
        .get("http://localhost:3000/fields")
        .then((data) => {
          let fields = data.data;
          commit("SET_FIELDS", fields);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async addEmployee({ commit }, employee) {
      const response = await axios.post("http://localhost:3000/employees", {
        name: employee.name,
        department: employee.department,
        position: employee.position,
        gender: employee.gender,
        age: employee.age,
        dBirth: employee.dBirth,
      });
      commit("NEW_EMPLOYEE", response.data);
    },
    updateEmployee({ commit }, employee) {
      commit("UPDATE_EPLOYEE", employee);
    },
    changeComplete({ commit }, employee) {
      commit("CHANGE_COMPLETE", employee);
    },
    async deleteEmployee({ commit }, id) {
      await axios.delete(`http://localhost:3000/employees/${id}`);
      commit("DEL_EMPLOYEE", id);
    },
    async editEmployee({ commit }, employee) {
      let response = await axios.put(
        `http://localhost:3000/employees/${employee.id}`,
        employee
      );
      commit("EDIT_EMPLOYEE", response.data);
    },
  },
  mutations: {
    SET_EMPLOYEES(state, employees) {
      state.employees = employees;
    },
    SET_FIELDS(state, fields) {
      state.fields = fields;
    },
    DEL_EMPLOYEE(state, id) {
      state.employees = state.employees.filter(
        (employee) => employee.id !== id
      );
    },
    NEW_EMPLOYEE(state, employee) {
      state.employees.push(employee);
    },
    EDIT_EMPLOYEE(state, employee) {
      state.employees.forEach((e) => {
        if (e.id == employee.id) {
          e = employee;
        }
      });
    },
  },
  getters: {
    employeesCount: (state) => {
      return state.employees.length;
    },
    maleEmployees: (state) => {
      // eslint-disable-next-line prettier/prettier
      return state.employees.filter((employee) => employee.gender[0] === "Male").length;
    },
    femaleEmployees: (state) => {
      // eslint-disable-next-line prettier/prettier
      return state.employees.filter((employee) => employee.gender[0] === "Female").length;
    },
    employeesI: (state) => {
      // eslint-disable-next-line prettier/prettier
      return state.employees.filter((employee) => employee.department === "IT").length;
    },
    employeesM: (state) => {
      // eslint-disable-next-line prettier/prettier
      return state.employees.filter((employee) => employee.department === "Marketing").length;
    },
    employeesA: (state) => {
      // eslint-disable-next-line prettier/prettier
      return state.employees.filter((employee) => employee.department === "Accounting").length;
    },
    avgAge: (state) => {
      var avgLength = state.employees.map((employee) => employee.age).length;
      // eslint-disable-next-line prettier/prettier
      return ( Math.floor(state.employees.map((employee) => employee.age).reduce((a, b) => a + b, 0) / avgLength)
      );
    },
    getEmployeeById: (state) => (id) => {
      return state.employees.find((employee) => employee.id == id);
    },
  },
  modules: {},
});
