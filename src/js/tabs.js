// Tab Navigation 

function tabs(items, panes) {
    var tabItems = document.querySelectorAll(items);
    var tabPanes = document.querySelectorAll(panes);
        
    this.init = function () {
        if (tabItems) {
            tabItems.forEach(function (item) {
                item.addEventListener('click', function (e) {
                    var tab = item.getAttribute('data-tab-target');
                    var pane = document.querySelector('[data-tab="' + tab + '"]');


                    if (pane) {
                        tabPanes.forEach(function (p) {
                            p.classList.add('hidden');
                        });

                        tabItems.forEach(function (t) {
                            t.classList.remove('active');
                        });

                        pane.classList.remove('hidden');
                    }

                    item.classList.add('active');
                    e.preventDefault();
                });
            });
        }
    };
}

var inventoryTabs = new tabs('.main-hdr-btn[data-tab-target]', '.main-section');
inventoryTabs.init();