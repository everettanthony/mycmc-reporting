$(document).ready(function() {    
    const btnBackToTop = document.querySelector('.back-to-top');

    // Initialize Order Status DataTable
    $('#tblInventory').DataTable( {
        dom: '<"tbl-hdr"lBf>rt<"tbl-btm"ip><"clear">',
        order: [[2, 'asc'], [1, 'asc']],
        pageLength: 50,
        fixedHeader: true,
        select: {
            style: 'multi'
        },
        buttons: [
            {
                text: 'Select all',
                action: function (e, dt, node, config) {
                    dt.rows().select();
                }
            },
            {
                text: 'Select current',
                action: function (e, dt, node, config) {
                    dt.rows({ page: 'current' }).select();
                }
            },
            {
                text: 'Select none',
                action: function (e, dt, node, config) {
                    dt.rows().deselect();
                }
            },
            {
                extend: 'excelHtml5',
                text: '',
                className: 'btn-excel',
                exportOptions: {
                    columns: ':visible'
                }
            }
        ]
    });

    // Toggle active class on table buttons
    $('.dt-buttons button').each(function () {
        $(this).on('click', function () {
            $('.dt-buttons button').removeClass('btn-active');
            $(this).toggleClass('btn-active');
        });
    });

    // Back to Top Button 
    if (btnBackToTop) {
        btnBackToTop.addEventListener("click", function () {
            scrollToTop();
        }); 
    }

    // Scroll to top
    function scrollToTop() {
        const c = document.documentElement.scrollTop || document.body.scrollTop;
        if (c > 0) {
            window.requestAnimationFrame(scrollToTop);
            window.scrollTo(0, c - c / 8);
        }
    }

    // Display back to top button based on scroll position
    function initBackToTop() {
        bottomVisible() ? btnBackToTop.classList.add('btn-show')
                        : btnBackToTop.classList.remove('btn-show');

        // if (scroll_pos > 1600) {
        //     btnBackToTop.classList.add('btn-show');
        // }
        // else {
        //     btnBackToTop.classList.remove('btn-show');
        // }
    }

    // Check if bottom is visible
    const bottomVisible = () => document.documentElement.clientHeight + window.scrollY >=
        (document.documentElement.scrollHeight || document.documentElement.clientHeight);

    // Scroll events to toggle visibility of the sidebar filter block and back to top button
    function initScrollEvents() {
        let last_known_scroll_position = 0;
        let ticking = false;

        window.addEventListener('scroll', function (e) {
            last_known_scroll_position = window.scrollY;

            if (!ticking) {
                window.requestAnimationFrame(function () {
                    initBackToTop(last_known_scroll_position);
                    ticking = false;
                });

                ticking = true;
            }
        });
    }

    initScrollEvents();
} );