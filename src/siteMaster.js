const navBar = `
    <nav id="sidebar" style="z-index: 9;">
        <div class="custom-menu">
            <button type="button" id="sidebarCollapse" class="btn btn-primary">
                <i class="fa fa-bars"></i>
                <span class="sr-only">Toggle Menu</span>
            </button>
        </div>
        <div class="p-4">
            <h1><a href="./index.html" class="logo">A B C <span>Schedule App</span></a></h1>
            <ul class="list-unstyled components mb-5">
                <li id="liHome" >
                    <a  href="#"><span class="fa fa-home mr-3"></span>Home</a>
                </li>
                <li id="liWorkingDays">
                    <a href="./workingDaysHours.html"><span class="fa fa-briefcase mr-3"></span>Working days and hours</a>
                </li>
                <li id="liSubjects">
                    <a href="./subjects.html"><span class="fa fa-paperclip mr-3"></span>Subjects</a>
                </li>
                <li id="liTags">
                    <a href="./tags.html"><span class="fa fa-tag mr-3"></span>Tags</a>
                </li>
                <li id="liLecturers">
                    <a href="./lecturers.html"><span class="fa fa-suitcase mr-3"></span>Lecturers</a>
                </li>
                <li id="liStudent">
                    <a href="./student.html"><span class="fa fa-user mr-3"></span>Student</a>
                </li>
                <li id="liStatics">
                    <a href="./statistics.html"><span class="fa fa-line-chart mr-3"></span>Statistics</a>
                </li>
                <li id="liSettings">
                    <a href="./settings.html"><span class="fa fa-cogs mr-3"></span>Settings</a>
                </li>
            </ul>
            <div class="mb-5">
                <h3 class="h6 mb-3">Subscribe for newsletter</h3>
                <form action="#" class="subscribe-form">
                    <div class="form-group d-flex">
                        <div class="icon"><span class="icon-paper-plane"></span></div>
                        <input type="text" class="form-control" placeholder="Enter Email Address">
                    </div>
                </form>
            </div>
        </div>
    </nav>
`;

module.exports = { navBar }
