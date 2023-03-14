<template>
  <div class="row">
    <div class="col-md-12">
      <div class="card">
        <div class="card-header cave-card-header">
          <h4 class="card-title">{{$messages.labelFilteringSection()}}</h4>
          <button
            type="submit"
            class="btn btn-info btn-round"
            @click="showFilter()"
          >
            {{ filterWord }}
          </button>
        </div>
        <div class="card-body" v-if="isFilter">
          <div class="form-group">
            <label>{{$messages.labelUsername()}}</label>
            <input
              type="text"
              class="form-control"
              v-model="pcutUtUsername"
            />
          </div>

           <div class="form-group">
            <label>{{$messages.labelMenuPromoCodeList()}}</label>
            <input
              type="text"
              class="form-control"
              v-model="pctCode"
            />
          </div>

          <div class="card-footer card-footer-right">
            <button
              type="submit"
              class="btn btn-danger btn-round"
              @click="resetFilter()"
            >
              {{$messages.labelFilteringReset()}}
            </button>
            <button
              type="submit"
              class="btn btn-info btn-round"
              @click="emitSearch()"
            >
              {{$messages.labelFilteringSearch()}}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data: () => ({
    pcutUtUsername: "",
    pctCode: "",
    isFilter: false,
  }),
  computed: {
    filterWord() {
      return this.isFilter ? this.$messages.labelFilteringHide() : this.$messages.labelFilteringShow();
    },
  },
  methods: {
    emitSearch() {
      this.$emit("search", {
        pcutUtUsername: this.pcutUtUsername,
        pctCode: this.pctCode
      });
    },
    resetFilter() {
      this.pcutUtUsername = "";
      this.pctCode = "";
      this.emitSearch();
    },
    showFilter() {
      this.isFilter = !this.isFilter;
    },
  },
};
</script>

<style>
.card-footer-right {
  display: grid;
  grid-template-columns: auto auto;
  grid-gap: 10px;
  padding: 10px 0;
  float: right;
}

.cave-card-header {
  display: grid;
  grid-template-columns: 1fr auto;
}
</style>