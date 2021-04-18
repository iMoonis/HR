<template>
  <div>
    <b-jumbotron class="py-3">
      <template #header
        >Employee: {{ employee.name }}
        <b-button class="bg-success" @click="show = !show"
          >Edit</b-button
        ></template
      >

      <b-col>
        <h3>Deparment: {{ employee.department }}</h3>
        <h3>Position: {{ employee.position }}</h3>
        <h3>Date of Birth: {{ employee.dBirth }}</h3>
        <h3>Gender: {{ employee.gender[0] }}</h3>
      </b-col>
      <edit-employee v-if="show"></edit-employee>
    </b-jumbotron>
  </div>
</template>

<script>
import EditEmployee from "../components/EditEmployee";
export default {
  components: {
    EditEmployee,
  },
  data() {
    return {
      show: false,
    };
  },
  computed: {
    employee() {
      return this.$store.getters.getEmployeeById(this.$route.params.id);
    },
  },
};
</script>
