<template>
  <v-slide-y-transition appear>
      <div>
    <v-toolbar>
      <v-autocomplete
        v-model="select"
        :items="searchHints"
        prepend-inner-icon="search"
        solo
        class="mt-1"
        :search-input.sync="search"
        hide-no-data
        placeholder="Search Apple Music"
        :loading="loading"
        @keyup.enter.native="onSearch"
        dense
        hide-selected
        hide-details
      >
      </v-autocomplete>
    </v-toolbar>
    <v-container fluid fill-height>
    <!-- <p class="display-1">Recommendations</p> -->
      <router-view></router-view>
    </v-container>
    </div>=
  </v-slide-y-transition>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: 'explore',
  data() {
    return {
      search: '',
      select: null
    }
  },
  watch: {
    search (val) {
      val && this.getSearchHints(val);
    }
  },
  methods: {
    getSearchHints(search) {
      this.$store.dispatch('explore/updateSearchHints', { search: this.search });
    },
    onSearch($event) {
      const searchText = this.search;
      this.$router.push({ name: 'search', params: { searchText }})
      this.$store.dispatch('explore/search', { query: this.search})
    }
  },
  computed: mapState('explore', {
    searchHints: 'searchHints',
    loading: 'loading'
  })
}
</script>
