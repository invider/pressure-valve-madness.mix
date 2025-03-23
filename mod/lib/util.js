
function compareZ(a, b) {
    if ( !a.Z || a.Z < b.Z ) return -1;
    if ( !b.Z || a.Z > b.Z ) return 1;
    return 0;
}

