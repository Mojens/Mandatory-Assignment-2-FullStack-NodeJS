<script>
    import toastr from "toastr";
    import { BASE_URL } from "../../stores/globalsStore.js";

    async function testSession() {
        const response = await fetch($BASE_URL + '/api/test-session', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        });
        const data = await response.json();
        if (response.status === 200) {
            toastr.success(data.message);
        } else {
            toastr.error(data.message);
        }
    }
</script>

<main>
    <h1>Hello this is your profile page</h1>
    <button on:click={testSession}>
        Test
    </button>
</main>

<style>
</style>
