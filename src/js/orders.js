$(document).ready(function() {    
    const btnBackToTop = document.querySelector('.back-to-top');

    // Initialize Order Status DataTable
    $('#orderStatus').DataTable( {
        dom: '<"tbl-hdr"lBf>rt<"tbl-btm"ip><"clear">',
        order: [[2, 'asc'], [1, 'asc']],
        rowGroup: {
            startRender: function ( rows, group ) {
                var salaryAvg = rows
                    .data()
                    .pluck(5)
                    .reduce( function (a, b) {
                        return a + b.replace(/[^\d]/g, '')*1;
                    }, 0);
                salaryAvg = $.fn.dataTable.render.number(',', '.', 0, '$').display( salaryAvg );
    
                return $('<tr/>')
                    .append( '<td colspan="5">'+group+'</td>' )
                    .append( '<td>'+salaryAvg+'</td>' );
            },
            dataSrc: [ 2, 1 ]
        },
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
            scrollToTop(300);
        }); 
    }

    // Scroll to top
    function scrollToTop(scrollDuration) {
        let scrollStep = -window.scrollY / (scrollDuration / 15);
        let scrollInterval = setInterval(function () {
            if (window.scrollY !== 0) {
                window.scrollBy(0, scrollStep);
            }
            else clearInterval(scrollInterval);
        }, 15);
    }

    // Display back to top button based on scroll position
    function initBackToTop(scroll_pos) {
        if (scroll_pos > 1600) {
            btnBackToTop.classList.add('btn-show');
        }
        else {
            btnBackToTop.classList.remove('btn-show');
        }
    }

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