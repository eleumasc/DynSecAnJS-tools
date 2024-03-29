var secret, low;
$Γ['global']['low'] = $Γ['global']['secret'] = 0;
secret = true;
$Γ['global']['secret'] = 1;

low = true;

$Γ['global']['low'] = $Λ[$Λ.length - 1].l;

$Λ.push({
    l: sec_lvl('secret', null, true, $Γ['global']),
    id: 'IF'
});

if (secret) {
    low = true;
    $Γ['global']['low'] = $Λ[$Λ.length - 1].l;
} else {
    $upgrade(['low'], $Λ[$Λ.length - 1].l, $Γ['global']);
}

$Λ.pop();

