<template>
  <Toolbar v-if="$route.name != 'Home'" class="d-flex align-items-center elevation-4">
    <Menu :items="itemsApp">
      <template #activator="props">
        <Button v-bind="props">
          <template #icon>
            <img src="assets/medias/logo-white.svg" width="20" height="20" style="transform: rotate(90deg)">
          </template>
          <span class="mw-2">Application</span>
        </Button>
      </template>
    </Menu>
    <Menu :items="itemsNavigation" activator-label="Navigation" activator-icon="diagram-3"></Menu>
    <Divider></Divider>
    <Menu :items="itemsHelp" activator-label="Help" activator-icon="question-circle"></Menu>
  </Toolbar>

  <RouterView></RouterView>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      itemsApp: [
        {
          label: "New project",
          icon: "kanban"
        },
        {
          label: "Open project",
          icon: "folder2-open"
        },
        {
          divider: true
        },
        {
          label: "New file",
          icon: "file-earmark-plus"
        },
        {
          label: "New folder",
          icon: "folder-plus"
        },
        {
          label: "Rename",
          icon: "input-cursor-text"
        },
        {
          divider: true
        },
        {
          label: "Save",
          icon: "hdd"
          // icon: "sd-card"
        },
        {
          label: "Export",
          icon: "file-arrow-up"
        },
        {
          label: "Import",
          icon: "file-arrow-down"
        },
        {
          divider: true
        },
        {
          label: "Settings",
          icon: "tools"
        },
        {
          label: "Customize",
          icon: "palette"
        },
        {
          divider: true
        },
        {
          label: "Quit JeeSee",
          icon: "door-open"
        },
      ],
      itemsNavigation: [
        {
          label: "Home",
          icon: "house",
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
      ],
      itemsHelp: [
        {
          label: "Documentation",
          icon: "book"
        },
        {
          label: "Help",
          icon: "question-circle"
        },
        {
          label: "Ressources",
          icon: "shop"
        },
        {
          label: "Community",
          icon: "chat-dots"
        },
      ]
    };
  }
};
</script>

<style></style>