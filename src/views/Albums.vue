<template>
  <v-slide-y-transition appear>
    <v-container fluid>
      <v-layout align-center justify-space-around row fill-height wrap>
        <v-progress-circular
          :size="50"
          color="primary"
          indeterminate
          v-if="albums.length === 0"
        ></v-progress-circular>
        <v-flex xs6 sm4 md3 lg2 v-for="album in albums" :key="album.id" @contextmenu="rightClick($event, album)">
          <MusicCard :name="album.attributes.name" :artwork="album.attributes.artwork" :artist="album.attributes.artistName" :media="album">
          </MusicCard>
        </v-flex>
      </v-layout>
                <v-menu absolute :position-x="contextX" :position-y="contextY" v-model="showContext">

            <v-list>
              <v-list-tile
                @click="playNext(album)"
              >
                <v-list-tile-title>Play Next</v-list-tile-title>
              </v-list-tile>
              <v-list-tile
                @click="playLater(album)"
              >
                <v-list-tile-title>Play Later</v-list-tile-title>
              </v-list-tile>
            </v-list>
          </v-menu>
    </v-container>
  </v-slide-y-transition>
</template>

<script>
import { mapState } from 'vuex';
import MusicCard from '../components/MusicCard';
export default {
  name: 'Albums',
  data () {
    return {
      showContext: false,
      contextX: 150,
      contextY: 0,
      album: null
    }
  },
  computed: mapState('player', {
    albums: 'albums',
    progress: 'progress',
    currentState: 'currentState',
    currentMedia: 'currentMedia'
  }),
  methods: {
    updateAlbums() {
      if (this.albums.length === 0) {
        this.$store.dispatch('player/updateAlbums')
      }
    },
    playSong(song) {
      this.$store.dispatch('player/playSong', { song: song });
    },
    playNext(song) {
      this.$store.dispatch('player/playNext', { song: song })
    },
    playLater(song) {
      this.$store.dispatch('player/playLater', { song: song })
    },
    rightClick(e, album) {
      e.preventDefault();
      this.album = album;
      this.contextX = e.x;
      this.contextY = e.y;
      this.showContext = true;
    }
  },
  created () {
    this.updateAlbums();
  },
  components: {
    MusicCard: MusicCard
  }
}
</script>