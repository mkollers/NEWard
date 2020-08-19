
import { FormGroup } from '@angular/forms';

export function MatchValidator(group: FormGroup) {
    const password = group.controls.password.value;
    const repeat = group.controls.repeat.value;

    if (password !== repeat) {
        group.controls.repeat.setErrors({
            mismatch: true
        });
    } else {
        group.controls.repeat.setErrors({
            missmatch: false
        });
    }
}