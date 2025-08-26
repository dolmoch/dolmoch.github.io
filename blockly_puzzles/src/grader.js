export class Grader {
    constructor(terminal) {
        this.terminal = terminal;
    }

    _log_line(line, style) {
        const element = document.createElement('span');
        element.textContent = line + '\n'
        element.setAttribute('class', style);
        this.terminal.appendChild(element);
    }

    log_diff(actual_line, expected_line) {
        this._log_line(actual_line, 'negative');
        this._log_line(expected_line, 'positive');
    }

    log_normal(line) {
        this._log_line(line, 'neutral');
    }

    log_info(line) {
        this._log_line(line, 'informational');
    }

    log_clear() {
        this.terminal.innerHTML = '';
    }

    _pad_to_equal_size(expected, log) {
        while (expected.length < log.length) {
            expected.push('');
        }
        while (log.length < expected.length) {
            log.push('');
        }
    }

    validate(log, expected) {
        this._pad_to_equal_size(expected, log);
        this.log_clear();
        var error_reported = false;
        for (let i = 0; i < log.length; i++) {
            let logString = log[i].toString();
            let expectedString = expected[i].toString();
            if (!error_reported && (logString !== expectedString)) {
                this.log_diff(logString, expectedString);
                error_reported = true;
            } else {
                this.log_normal(logString);
            }
        }
        return !error_reported;
    }
}