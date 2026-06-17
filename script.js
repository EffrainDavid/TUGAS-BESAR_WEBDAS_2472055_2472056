   $(document).ready(function () {

      const destinations = [
        {
          id: 1,
          name: "Wat Phra Kaew",
          category: "budaya",
          city: "Bangkok",
          desc: "Kuil Buddha Zamrud yang menjadi simbol spiritual Thailand.",
          rating: 4.9,
          badge: "Ikonik",
          image: "dthailand1.jpg"
        },
        {
          id: 2,
          name: "Maya Bay",
          category: "pantai",
          city: "Krabi",
          desc: "Pantai eksotis dengan pasir putih dan air laut jernih.",
          rating: 4.8,
          badge: "Populer",
          image: "dthailand2.jpg"
        },
        {
          id: 3,
          name: "Doi Inthanon",
          category: "alam",
          city: "Chiang Mai",
          desc: "Puncak tertinggi Thailand dengan panorama luar biasa.",
          rating: 4.7,
          badge: null,
          image: "dthailand3.jpg"
        },
        {
          id: 4,
          name: "Chatuchak Market",
          category: "kota",
          city: "Bangkok",
          desc: "Pasar akhir pekan terbesar dan paling terkenal di Thailand.",
          rating: 4.6,
          badge: null,
          image: "dthailand4.jpg"
        },
        {
          id: 5,
          name: "Patong Beach",
          category: "pantai",
          city: "Phuket",
          desc: "Pantai terkenal dengan kehidupan malam yang meriah.",
          rating: 4.5,
          badge: null,
          image: "dthailand5.jpg"
        },
        {
          id: 6,
          name: "White Temple",
          category: "budaya",
          city: "Chiang Rai",
          desc: "Kuil putih modern yang menjadi ikon wisata Thailand.",
          rating: 4.8,
          badge: "Unik",
          image: "dthailand6.jpg"
        }
      ];

      const foods = [
        {
          name: "Pad Thai",
          image: "kthailand1.jpg",
          desc: "Mi goreng khas Thailand."
        },
        {
          name: "Tom Yum",
          image: "kthailand2.jpg",
          desc: "Sup pedas dan asam yang terkenal."
        },
        {
          name: "Mango Sticky Rice",
          image: "kthailand3.jpg",
          desc: "Makanan penutup favorit wisatawan."
        },
        {
          name: "Green Curry",
          image: "kthailand4.jpg",
          desc: "Kari hijau khas Thailand."
        }
      ];

      const tips = [
        {
          q: "Kapan waktu terbaik ke Thailand?",
          a: "November hingga Februari adalah musim terbaik untuk berkunjung."
        },
        {
          q: "Transportasi apa yang tersedia di Thailand?",
          a: "Thailand memiliki BTS Skytrain, MRT, bus, kereta api, taksi, tuk-tuk, serta penerbangan domestik yang mudah digunakan wisatawan."
        },
        {
          q: "Apakah Thailand aman untuk wisatawan?",
          a: "Secara umum Thailand cukup aman untuk wisatawan. Tetap waspada terhadap barang bawaan dan hindari daerah yang tidak dikenal pada malam hari."
        },
      ];

      const slides = [
        {
          title: "Bangkok",
          desc: "Kota metropolitan modern yang penuh budaya.",
          image: "gthailand1.jpg"
        },
        {
          title: "Phuket",
          desc: "Pantai tropis yang indah.",
          image: "gthailand2.jpg"
        },
        {
          title: "Chiang Mai",
          desc: "Kota pegunungan yang damai.",
          image: "gthailand3.jpg"
        }
      ];

      let wishlist =
        JSON.parse(localStorage.getItem("thailand_wishlist")) || [];

      function saveWishlist() {
        localStorage.setItem(
          "thailand_wishlist",
          JSON.stringify(wishlist)
        );

        $("#wishCount").text(wishlist.length);
      }

      saveWishlist();


      function renderDestinations(filter = "all") {

        $("#destGrid").empty();

        const filtered =
          filter === "all"
            ? destinations
            : destinations.filter(
              d => d.category === filter
            );

        filtered.forEach(dest => {

          const saved =
            wishlist.includes(dest.id);

          const card = `
                <div class="dest-card">

                  ${dest.badge ?
              `<span class="card-badge">${dest.badge}</span>`
              : ""
            }

                  <div class="card-art">
                      <img src="${dest.image}" alt="${dest.name}">
                  </div>

                  <div class="card-body">

                      <div class="card-category">
                          ${dest.category}
                      </div>

                      <h3 class="card-title">
                          ${dest.name}
                      </h3>

                      <p class="card-desc">
                          ${dest.desc}
                      </p>

                      <div class="card-footer">

                          <div class="card-rating">
                              <span class="star">★</span>
                              ${dest.rating}
                          </div>

                          <button
                              class="wishlist-toggle ${saved ? 'saved' : ''}"
                              data-id="${dest.id}">
                              ${saved ? '❤' : '♡'}
                          </button>

                      </div>

                  </div>

                </div>
              `;

          $("#destGrid").append(card);

        });
      }

      renderDestinations();

      $(".filter-btn").on("click", function () {

        $(".filter-btn").removeClass("active");

        $(this).addClass("active");

        renderDestinations(
          $(this).data("filter")
        );

      });

      $(document).on(
        "click",
        ".wishlist-toggle",
        function () {

          const id =
            parseInt($(this).data("id"));

          if (wishlist.includes(id)) {

            wishlist =
              wishlist.filter(
                item => item !== id
              );

          } else {

            wishlist.push(id);

          }

          saveWishlist();

          renderDestinations(
            $(".filter-btn.active")
              .data("filter")
          );

          showToast(
            "Wishlist berhasil diperbarui"
          );

        }
      );

      $("#openWishlist").on("click", function () {

        $("#wishList").empty();

        if (wishlist.length === 0) {

          $("#emptyWish").show();

        } else {

          $("#emptyWish").hide();

          wishlist.forEach(id => {

            const item =
              destinations.find(
                d => d.id === id
              );

            $("#wishList").append(`
                <li class="wish-item">
                  ${item.name}
                </li>
              `);

          });

        }

        $("#wishModal").addClass("open");

      });

      $("#closeModal").on("click", function () {

        $("#wishModal").removeClass("open");

      });

      foods.forEach(food => {

        $("#foodGrid").append(`

            <div class="food-card">

              <div class="food-image">
                <img src="${food.image}" alt="${food.name}">
              </div>

              <div class="food-name">
                ${food.name}
              </div>

              <p class="food-desc">
                ${food.desc}
              </p>

            </div>

          `);

      });

      tips.forEach(tip => {

        $("#accordion").append(`

            <div class="accordion-item">

              <button class="accordion-header">

                ${tip.q}

                <span class="accordion-icon">
                  +
                </span>

              </button>

              <div class="accordion-body">
                ${tip.a}
              </div>

            </div>

          `);

      });

      $(document).on(
        "click",
        ".accordion-header",
        function () {

          const body =
            $(this).next();

          $(".accordion-body")
            .not(body)
            .slideUp();

          body.slideToggle();

        }
      );

      slides.forEach(slide => {

        $("#sliderTrack").append(`

            <div class="slide">

              <img
                src="${slide.image}"
                alt="${slide.title}"
                class="slide-image"
              >

              <div class="slide-overlay"></div>

              <div class="slide-content">

                <h3>${slide.title}</h3>

                <p>${slide.desc}</p>

              </div>

            </div>

          `);

      });

      let currentSlide = 0;

      function showSlide(index) {

        currentSlide = index;

        $("#sliderTrack").css(
          "transform",
          `translateX(-${index * 100}%)`
        );

      }

      $("#slideNext").on("click", function () {

        currentSlide++;

        if (currentSlide >= slides.length) {
          currentSlide = 0;
        }

        showSlide(currentSlide);

      });

      $("#slidePrev").on("click", function () {

        currentSlide--;

        if (currentSlide < 0) {
          currentSlide =
            slides.length - 1;
        }

        showSlide(currentSlide);

      });

      setInterval(function () {

        $("#slideNext").click();

      }, 5000);

      function showToast(message) {

        $("#toast")
          .text(message)
          .addClass("show");

        setTimeout(function () {

          $("#toast")
            .removeClass("show");

        }, 2500);

      }

      function revealElements() {

        $(".reveal").each(function () {

          const top =
            this.getBoundingClientRect().top;

          if (top < window.innerHeight - 80) {

            $(this).addClass("visible");

          }

        });

      }

      revealElements();

      $(window).on(
        "scroll",
        revealElements
      );

      $(window).on("scroll", function () {

        if ($(this).scrollTop() > 50) {

          $("#navbar").css(
            "background",
            "rgba(26,18,1,.98)"
          );

        } else {

          $("#navbar").css(
            "background",
            "rgba(26,18,1,.92)"
          );

        }

      });

      $("#hamburger").on("click", function () {

        $("#navLinks").toggleClass("open");

      });

    });