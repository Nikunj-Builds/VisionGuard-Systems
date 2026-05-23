document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. DYNAMIC PAGE ROUTING (NAV CHANGER) ---
    const navLinks = document.querySelectorAll(".nav-link, .footer-nav");
    const pageViews = document.querySelectorAll(".page-view");

    function changePage(targetId) {
        // Sabhi pages ko pehle hide karein
        pageViews.forEach(view => {
            view.classList.remove("active-view");
        });

        // Header active states reset karein
        document.querySelectorAll(".nav-link").forEach(link => {
            link.classList.remove("active");
        });

        // Target page aur corresponding header nav element activate karein
        const targetPage = document.getElementById(`view-${targetId}`);
        if (targetPage) {
            targetPage.classList.add("active-view");
        }

        const targetNav = document.querySelector(`.nav-link[data-target="${targetId}"]`);
        if (targetNav) {
            targetNav.classList.add("active");
        }

        // Window scroll top par reset karein smoothly
        window.scrollTo({ top: 0, behavior: "instant" });
    }

    // Header aur Footer links ke click events handle karein
    navLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const target = link.getAttribute("data-target");
            changePage(target);
        });
    });

    // Home Page ke "Explore Systems" red button ke liye action panel routing
    const exploreBtn = document.getElementById("hero-explore-btn");
    if (exploreBtn) {
        exploreBtn.addEventListener("click", () => {
            changePage("shop");
        });
    }


    // --- SHOP CART WITH DIRECT WHATSAPP ACTION ---
    const buyButtons = document.querySelectorAll(".item-action-btn");

    buyButtons.forEach(button => {
        button.addEventListener("click", () => {
            const productName = button.getAttribute("data-name");
            const associatedCheckboxId = button.getAttribute("data-cb");
            const isInstallationChecked = document.getElementById(associatedCheckboxId).checked;

            // WhatsApp Custom Message Text Formulation
            let textMessage = `Hello VisionGuard, I want to inquire/order:\n- Product: ${productName}`;
            if (isInstallationChecked) {
                textMessage += `\n- Requirement: Need On-site Installation Service`;
            } else {
                textMessage += `\n- Requirement: Hardware Delivery Only`;
            }

            // Encode message for URL format
            const encodedMessage = encodeURIComponent(textMessage);
            
            // Redirecting directly to business WhatsApp channel
            window.open(`https://wa.me/919810946227?text=${encodedMessage}`, '_blank');
        });
    });
});