const navBar = '<nav id="sidebar" style="z-index: 9;">' +
    '<div class="custom-menu">' +
    '<button type="button" id="sidebarCollapse" class="btn btn-primary">' +
    '<i class="fa fa-bars"></i>' +
    '<span class="sr-only">Toggle Menu</span>' +
    '</button>' +
    '</div>' +
    '<div class="p-4">' +
    '<h1><a href="../index.html" class="logo">A B C <span>Schedule App</span></a></h1>' +
    '<ul class="list-unstyled components mb-5">' +
    '<li id="liHome" >' +
    '<a  href="#"><span class="fa fa-home mr-3"></span> Home</a>' +
    '</li>' +
    '<li id="liWorkingDays">' +
    '<a href="./components/workingDaysHours.html"><span class="fa fa-briefcase mr-3"></span>  Working days and hours</a>' +
    '</li>' +
    '<li id="liTags">' +
    '<a href="./components/tags.html"><span class="fa fa-suitcase mr-3"></span> Tags</a>' +
    '</li>' +
    '<li>' +
    '<a href="#"><span class="fa fa-cogs mr-3"></span> Services</a>' +
    '</li>' +
    '<li>' +
    '<a href="#"><span class="fa fa-paper-plane mr-3"></span> Contacts</a>' +
    '</li>' +
    '</ul>' +
    '' +
    '<div class="mb-5">' +
    '<h3 class="h6 mb-3">Subscribe for newsletter</h3>' +
    '<form action="#" class="subscribe-form">' +
    '<div class="form-group d-flex">' +
    '<div class="icon"><span class="icon-paper-plane"></span></div>' +
    '<input type="text" class="form-control" placeholder="Enter Email Address">' +
    '</div>' +
    '</form>' +
    '</div>' +
    '' +
    '</div>' +
    '</nav>';

module.exports = { navBar }