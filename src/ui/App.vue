<template>
  <Toolbar v-if="$route.name != 'Home'">
    <Menu :items="items"></Menu>
  </Toolbar>
  <RouterView></RouterView>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      items: [
        {
          label: "Home",
          icon: "home",
          to: { name: "Home" }
        },
        {
          divider: true
        },
        {
          label: "Documentation",
          icon: "book",
          to: { name: "UiDocumentation" }
        },
        {
          label: "Engine",
          icon: "joystick",
          to: { name: "Engine" }
        }
      ]
    };
  }
};
</script>

<style></style>