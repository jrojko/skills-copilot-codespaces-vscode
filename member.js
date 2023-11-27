function skillsMember() {
    var member = document.getElementById("member");
    var memberSkills = document.getElementById("memberSkills");
    var memberSkillsWidth = memberSkills.offsetWidth;
    var memberWidth = member.offsetWidth;
    var memberLeft = member.offsetLeft;
    var memberSkillsLeft = memberLeft - memberSkillsWidth - 5;
    var memberSkillsTop = member.offsetTop;
    memberSkills.style.left = memberSkillsLeft + "px";
    memberSkills.style.top = memberSkillsTop + "px";
    memberSkills.style.display = "block";
}