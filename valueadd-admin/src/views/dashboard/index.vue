<template>
    <div class="dashboard-container">
        <component :is="currentRole"></component>
    </div>
</template>

<script>
export default {
    name: "dashboard",
    components: { adminDashboard, editorDashboard },
    data() {
        return {
            currentRole: "adminDashboard"
        };
    },
    computed: {
        ...mapGetters(["roles"])
    },
    created() {
        if (!this.roles.includes("admin")) {
            this.currentRole = "editorDashboard";
        }
    }
};
</script>

