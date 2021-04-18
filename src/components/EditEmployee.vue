<template>
  <b-jumbotron class="col-lg-5" header="Edit Employee">
    <b-form v-if="show">
      <b-form-group id="name" label="Employee Name:" label-for="name">
        <b-form-input
          id="editInput-1"
          v-model="employee.name"
          placeholder="Enter name"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="department" label="Department:" label-for="department">
        <b-form-select
          id="editInput-2"
          v-model="employee.department"
          :options="departments"
          required
        ></b-form-select>
      </b-form-group>

      <b-form-group
        id="position"
        label="Employee Position:"
        label-for="position"
      >
        <b-form-input
          id="editInput-3"
          v-model="employee.position"
          placeholder="Position"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="editInput-4" v-slot="{ ariaDescribedby }">
        <b-form-checkbox-group
          v-model="employee.gender"
          :aria-describedby="ariaDescribedby"
        >
          <b-form-checkbox value="Male">Male</b-form-checkbox>
          <b-form-checkbox value="Female">Female</b-form-checkbox>
        </b-form-checkbox-group>
      </b-form-group>

      <b-form-group id="age" label="Employee Name:" label-for="age">
        <b-form-input
          id="editInput-5"
          type="date"
          v-model="employee.dBirth"
          placeholder="Date of birth"
          required
        ></b-form-input>
      </b-form-group>

      <b-button class="mr-3" @click="saveEmployee" variant="primary"
        >Save</b-button
      >
    </b-form>
  </b-jumbotron>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: "",
        department: null,
        position: "",
        gender: [],
        age: "",
      },
      departments: [
        { text: "Select One", value: null },
        "IT",
        "Marketing",
        "Accounting",
      ],
      show: true,
    };
  },
  methods: {
    saveEmployee() {
      this.$store.dispatch("editEmployee", this.employee);
    },
  },
  computed: {
    employee() {
      return this.$store.getters.getEmployeeById(this.$route.params.id);
    },
  },
};
</script>
