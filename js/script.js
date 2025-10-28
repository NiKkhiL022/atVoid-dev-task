// ==========================================
// SUPER WATER - Interactive Features
// ==========================================

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  
  // ==========================================
  // MOBILE NAVIGATION TOGGLE
  // ==========================================
  const menuBtn = document.getElementById('menuBtn');
  const mobileModal = document.getElementById('mobileModal');
  const closeModal = document.getElementById('closeModal');
  
  // Toggle mobile menu visibility
  const toggleMobileMenu = (isOpen) => {
    if (!mobileModal) return;
    
    if (isOpen) {
      mobileModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    } else {
      mobileModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  };
  
  if (menuBtn && mobileModal && closeModal) {
    menuBtn.addEventListener('click', () => toggleMobileMenu(true));
    closeModal.addEventListener('click', () => toggleMobileMenu(false));
    
    // Close modal when clicking outside
    mobileModal.addEventListener('click', function(e) {
      if (e.target === mobileModal) {
        toggleMobileMenu(false);
      }
    });
    
    // Close modal when clicking any nav link
    const mobileNavLinks = mobileModal.querySelectorAll('.nav__link');
    mobileNavLinks.forEach(link => {
      link.addEventListener('click', () => toggleMobileMenu(false));
    });
  }
  
  // ==========================================
  // QUANTITY INCREMENT/DECREMENT
  // ==========================================
  const decrementBtn = document.getElementById('decrementBtn');
  const incrementBtn = document.getElementById('incrementBtn');
  const quantityCount = document.getElementById('quantityCount');
  
  const MIN_QUANTITY = 1;
  const MAX_QUANTITY = 99;
  let count = MIN_QUANTITY;
  
  // Function to update button states
  const updateButtonStates = () => {
    if (decrementBtn) {
      decrementBtn.disabled = (count <= MIN_QUANTITY);
    }
    if (incrementBtn) {
      incrementBtn.disabled = (count >= MAX_QUANTITY);
    }
  };
  
  // Function to animate quantity change
  const animateQuantityChange = () => {
    if (!quantityCount) return;
    
    quantityCount.style.transform = 'scale(1.2)';
    setTimeout(() => {
      quantityCount.style.transform = 'scale(1)';
    }, 200);
  };
  
  // Function to update quantity
  const updateQuantity = (newCount) => {
    if (newCount >= MIN_QUANTITY && newCount <= MAX_QUANTITY && quantityCount) {
      count = newCount;
      quantityCount.textContent = count;
      animateQuantityChange();
      updateButtonStates();
    }
  };
  
  if (decrementBtn && incrementBtn && quantityCount) {
    // Set initial state
    updateButtonStates();
    
    decrementBtn.addEventListener('click', () => {
      updateQuantity(count - 1);
    });
    
    incrementBtn.addEventListener('click', () => {
      updateQuantity(count + 1);
    });
  }
  
  // ==========================================
  // PACK OPTION SELECTION
  // ==========================================
  // PACK OPTION SELECTION
  // ==========================================
  const packOptions = document.querySelectorAll('.pack-option');
  
  packOptions.forEach(option => {
    option.addEventListener('click', function() {
      // Remove selected class from all options
      packOptions.forEach(opt => opt.classList.remove('pack-option--selected'));
      // Add selected class to clicked option
      this.classList.add('pack-option--selected');
    });
  });
  
  // ==========================================
  // ADD TO CART BUTTON
  // ==========================================
  const addToCartBtn = document.querySelector('.hero__addcart');
  
  if (addToCartBtn) {
    addToCartBtn.addEventListener('click', function() {
      // Get selected pack
      const selectedPack = document.querySelector('.pack-option--selected .pack-option__desc');
      const selectedPackName = selectedPack ? selectedPack.textContent.trim() : 'Pack of 1';
      
      // Show success message
      showNotification(`Added ${count} x ${selectedPackName} to cart!`);
      
      // Reset quantity to 1 after adding to cart
      updateQuantity(MIN_QUANTITY);
      
      // Add button animation
      this.style.transform = 'scale(0.95)';
      setTimeout(() => {
        this.style.transform = 'scale(1)';
      }, 200);
    });
  }
  
  // ==========================================
  // SMOOTH SCROLL (Bonus Feature)
  // ==========================================
  const navLinks = document.querySelectorAll('.nav__link[href^="#"]');
  
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      // Only prevent default if it's an anchor link to an element
      if (href && href.startsWith('#') && href.length > 1) {
        const targetElement = document.querySelector(href);
        
        if (targetElement) {
          e.preventDefault();
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    });
  });
  
  // ==========================================
  // NOTIFICATION SYSTEM
  // ==========================================
  function showNotification(message) {
    // Check if notification already exists
    let notification = document.querySelector('.notification');
    
    if (!notification) {
      // Create notification element
      notification = document.createElement('div');
      notification.className = 'notification';
      document.body.appendChild(notification);
    }
    
    notification.textContent = message;
    notification.classList.add('notification--show');
    
    // Remove notification after 3 seconds
    setTimeout(() => {
      notification.classList.remove('notification--show');
    }, 3000);
  }
  
  // ==========================================
  // KEYBOARD ACCESSIBILITY
  // ==========================================
  // Close mobile menu with Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && mobileModal && mobileModal.classList.contains('active')) {
      toggleMobileMenu(false);
    }
  });
  
  // ==========================================
  // SCROLL ANIMATIONS (Optional Enhancement)
  // ==========================================
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observerCallback = (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
      }
    });
  };
  
  const observer = new IntersectionObserver(observerCallback, observerOptions);
  
  // Observe elements for animation
  const animatedElements = document.querySelectorAll('.hero__title, .hero__subtitle, .hero__desc');
  animatedElements.forEach(el => observer.observe(el));
  
});

// ==========================================
// ADD NOTIFICATION STYLES DYNAMICALLY
// ==========================================
(function addNotificationStyles() {
  const style = document.createElement('style');
  style.textContent = `
    .notification {
      position: fixed;
      top: 20px;
      right: 20px;
      background: linear-gradient(135deg, #b3ff35 0%, #75e620 100%);
      color: #242724;
      padding: 16px 24px;
      border-radius: 8px;
      font-weight: 600;
      box-shadow: 0 4px 12px rgba(179, 255, 53, 0.3);
      transform: translateX(400px);
      transition: transform 0.3s ease;
      z-index: 3000;
      max-width: 300px;
    }
    
    .notification--show {
      transform: translateX(0);
    }
    
    @media (max-width: 768px) {
      .notification {
        left: 20px;
        right: 20px;
        max-width: none;
      }
    }
  `;
  document.head.appendChild(style);
})();
