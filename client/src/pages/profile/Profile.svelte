<script>
    import { onMount } from "svelte";
    import toastr from "toastr";
    import { BASE_URL } from "../../stores/globalsStore.js";
    import { user } from "../../stores/userStore.js";
    let first_name = "";
    let last_name = "";
    let email = "";
    async function getUser() {
        const response = await fetch($BASE_URL + `/api/users/${$user.id}`, {
            method: "GET",
            credentials: "include",
        });
        const data = await response.json();
        if (response.status === 200) {
            first_name = data.user.first_name;
            last_name = data.user.last_name;
            email = data.user.email;
        } else {
            toastr.error(data.message);
        }
    }
    async function handleUpdateProfile() {
        const response = await fetch($BASE_URL + `/api/users/${$user.id}`, {
            method: "PUT",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                first_name,
                last_name,
                email,
            }),
        });
        const data = await response.json();
        if (response.status === 200) {
            toastr.success(data.message);
            getUser();
        } else {
            toastr.error(data.message);
        }
    }
    async function handleResetPassword() {
        const response = await fetch($BASE_URL + "/api/forgot-password", {
            credentials: "include",
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
            }),
        });
        const data = await response.json();
        if (response.status === 200) {
            toastr.success(data.message);
        } else {
            toastr.error(data.message);
        }
    }
    onMount(async () => {
        await getUser();
    });
</script>

<main class="profile">
    <h1 class="profile_title">This is your profile page</h1>
    <div class="form-container">
        <form class="form" on:submit|preventDefault={handleUpdateProfile}>
            <div class="form_group">
                <label for="first_name">First Name</label>
                <input
                    type="text"
                    id="first_name"
                    class="form_input"
                    bind:value={first_name}
                />
            </div>
            <div class="form_group">
                <label for="last_name">Last Name</label>
                <input
                    type="text"
                    id="last_name"
                    class="form_input"
                    bind:value={last_name}
                />
            </div>
            <div class="form_group">
                <label for="email">Email</label>
                <input
                    type="text"
                    id="email"
                    class="form_input"
                    bind:value={email}
                />
            </div>
            <div class="form_button-container">
                <button type="submit" class="form_button">Update Profile</button
                >
            </div>
        </form>
        <div class="button-container">
            <button class="reset-button" on:click={handleResetPassword}
                >Reset Password</button
            >
        </div>
    </div>
</main>

<style>
    .profile {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        border-radius: 8px;
        background-color: #f5f5f5;
    }

    .profile_title {
        font-size: 2.5rem;
        color: #333;
        margin-bottom: 2rem;
        text-align: center;
    }
    .form-container {
        background-color: #fff;
        border-radius: 8px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        padding: 2rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        max-width: 800px !important;
        width: 100%;
        margin: 0 auto;
    }

    .form_group {
        margin-bottom: 1.5rem;
        display: flex;
        flex-direction: column;
    }

    .form_input {
        width: 100%;
        padding: 1rem;
        border-radius: 4px;
        border: 1px solid #ccc;
        font-size: 1.2rem;
    }

    .form_button {
        background-color: #646cff;
        color: #fff;
        padding: 1rem 2rem;
        border-radius: 4px;
        font-size: 1.1rem;
        font-weight: 600;
        border: none;
        cursor: pointer;
        transition: background-color 0.3s ease;
    }

    .form_button:hover {
        background-color: #535bf2;
    }

    .reset-button {
        margin-top: 1rem;
        background-color: transparent;
        border: none;
        color: #646cff;
        font-size: 1.1rem;
        font-weight: 600;
        cursor: pointer;
        transition: color 0.3s ease;
    }

    .reset-button:hover {
        color: #535bf2;
    }
    label {
        color: #535bf2;
        font-weight: bold;
    }
    .button-container {
        display: inline-block;
        vertical-align: top;
    }
    .form_button-container {
        text-align: center;
    }
</style>
