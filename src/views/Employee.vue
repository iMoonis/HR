<template>
  <b-container fluid>
    <b-row>
      <!-- Search Start -->
      <b-col lg="6" class="my-1">
        <b-form-group
          label="Filter"
          label-for="filter-input"
          label-cols-sm="3"
          label-align-sm="right"
          label-size="sm"
          class="mb-0"
        >
          <b-input-group size="sm">
            <b-form-input
              id="filter-input"
              v-model="filter"
              type="search"
              placeholder="Type to Search"
            ></b-form-input>

            <b-input-group-append>
              <b-button :disabled="!filter" @click="filter = ''">
                Clear
              </b-button>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
      </b-col>

      <b-col lg="6" class="my-1">
        <b-form-group
          v-model="sortDirection"
          label="Filter On:"
          description="Leave all unchecked to filter on all data"
          label-cols-sm="3"
          label-align-sm="right"
          label-size="sm"
          class="mb-0"
          v-slot="{ ariaDescribedby }"
        >
          <b-form-checkbox-group
            v-model="filterOn"
            :aria-describedby="ariaDescribedby"
            class="mt-1"
          >
            <b-form-checkbox value="name">Name</b-form-checkbox>
            <b-form-checkbox value="department">Department</b-form-checkbox>
            <b-form-checkbox value="position">Position</b-form-checkbox>
          </b-form-checkbox-group>
        </b-form-group>
      </b-col>
    </b-row>

    <!-- Main table element start -->
    <b-table
      :items="employees"
      :fields="fields"
      :current-page="currentPage"
      :per-page="perPage"
      :filter="filter"
      :filter-included-fields="filterOn"
      :sort-by.sync="sortBy"
      :sort-desc.sync="sortDesc"
      :sort-direction="sortDirection"
      stacked="md"
      show-empty
      striped
      bordered
      hover
      head-variant="dark"
      @filtered="onFiltered"
    >
      <template #cell(name)="row">
        <router-link :to="`/employeeDetails/${row.item.id}`">
          {{ row.value }}
        </router-link>
      </template>

      <template #row-details="row">
        <b-card>
          <b-list-group>
            <b-list-group-item v-for="(value, key) in row.item" :key="key">
              {{ key }}: {{ value }}
            </b-list-group-item>
          </b-list-group>
        </b-card>
      </template>

      <template #cell(actions)="row">
        <b-button
          class="mr-2"
          variant="danger"
          size="sm"
          @click="deleteEmployee(row.item.id)"
        >
          Delete
        </b-button>
        <router-link
          :to="`/employeeDetails/${row.item.id}`"
          variant="primary"
          size="sm"
          @click="updateEmployee(row.item)"
        >
          Edit
        </router-link>
      </template>
    </b-table>
    <!-- Main table element end -->

    <b-row>
      <b-col sm="5" md="6" class="my-1">
        <b-form-group
          label="Per page"
          label-for="per-page-select"
          label-cols-sm="6"
          label-cols-md="4"
          label-cols-lg="3"
          label-align-sm="right"
          label-size="sm"
          class="mb-0"
        >
          <b-form-select
            id="per-page-select"
            v-model="perPage"
            :options="pageOptions"
            size="sm"
          ></b-form-select>
        </b-form-group>
      </b-col>
      <b-col sm="7" md="6" class="my-1">
        <!-- Pagination Start -->
        <b-pagination
          v-model="currentPage"
          :total-rows="employeesCount"
          :per-page="perPage"
          align="fill"
          size="sm"
          class="my-0"
        ></b-pagination>
        <!-- Pagination End -->
      </b-col>
    </b-row>
    <b-row>
      <AddEmployee />
    </b-row>
  </b-container>
</template>

<script>
import AddEmployee from "../components/AddEmployee";
import { mapState, mapGetters, mapActions } from "vuex";
export default {
  components: {
    AddEmployee,
  },
  data() {
    return {
      currentPage: 1,
      perPage: 5,
      pageOptions: [5, 10, { value: 100, text: "Show All" }],
      sortBy: "",
      sortDesc: false,
      sortDirection: "asc",
      filter: null,
      filterOn: [],
    };
  },
  computed: {
    ...mapState(["employees", "fields"]),
    ...mapGetters(["employeesCount"]),
    sortOptions() {
      // Create an options list
      return this.fields
        .filter((f) => f.sortable)
        .map((f) => {
          return { text: f.label, value: f.key };
        });
    },
  },
  mounted() {
    this.$store.dispatch("loadEmployees");
    this.$store.dispatch("loadFields");
  },
  methods: {
    ...mapActions(["deleteEmployee", "updateEmployee"]),
    onFiltered(filteredEmployees) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredEmployees.length;
      this.currentPage = 1;
    },
  },
};
</script>
