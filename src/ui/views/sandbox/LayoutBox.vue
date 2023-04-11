<script>
import { h } from 'vue';

export default {
  setup() {
      return () => h("div.layout-box", "test")
    }
  }
</script>

<style scoped>
.layout-box {
  /* padding: 1em;
  margin: -1em; */
  margin: 1rem;
  border: 1px solid rgba(28, 209, 212, 0.5);
}
</style>