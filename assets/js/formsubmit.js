
  document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("dreamit-form");

    form.addEventListener("submit", async function (e) {
      e.preventDefault();

      const formData = new FormData(form);
      const name = formData.get("name")?.trim();
      const email = formData.get("email")?.trim();
      const subject = formData.get("subject")?.trim();
      const phone = formData.get("phone")?.trim();
      const message = formData.get("message")?.trim();

      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const phonePattern = /^[0-9+()\s-]{7,15}$/;

      // 🔍 Validate input
      if (!name || !email || !subject || !phone || !message) {
        return Swal.fire({
          icon: "warning",
          title: "All fields are required!",
          confirmButtonColor: "#ff4d00"
        });
      }

      if (!emailPattern.test(email)) {
        return Swal.fire({
          icon: "error",
          title: "Invalid email format.",
          confirmButtonColor: "#ff4d00"
        });
      }

      if (!phonePattern.test(phone)) {
        return Swal.fire({
          icon: "error",
          title: "Enter a valid phone number.",
          confirmButtonColor: "#ff4d00"
        });
      }

      // 📦 Data object
      const data = { name, email, subject, phone, message };

      // 🌐 Send to Power Automate
      try {
        const response = await fetch("https://defaultb6f650d017bb40cf8d9f31f49613c2.65.environment.api.powerplatform.com:443/powerautomate/automations/direct/workflows/2c206b1e51ac42e6ba521ec273908fc3/triggers/manual/paths/invoke/?api-version=1&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=D9FMxv7WNZKuUIw0JTa9EiITW5bXHy5KhqkHK9Xnaxw", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data)
        });

        if (response.ok) {
          Swal.fire({
            icon: "success",
            title: "Submitted successfully!",
            text: "We’ll get back to you shortly.",
            confirmButtonColor: "#28a745"
          });
          form.reset();
        } else {
          Swal.fire({
            icon: "error",
            title: "Submission failed",
            text: "Please try again later.",
            confirmButtonColor: "#dc3545"
          });
        }
      } catch (error) {
        console.error("Error:", error);
        Swal.fire({
          icon: "error",
          title: "Network error",
          text: "Check your internet connection and try again.",
          confirmButtonColor: "#dc3545"
        });
      }
    });
  });
