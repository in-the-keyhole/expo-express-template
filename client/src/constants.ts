/**
 * Copyright © 2024-2025 Boardman Enterprises, LLC
 * All rights reserved.
 */

const SORT_UP = 'UP'
const SORT_DOWN = 'DOWN'

const SORT_ORDER = {
    [SORT_UP]: 'Up',
    [SORT_DOWN]: 'Down',
}

const ERROR_FIRST_NAME_REQUIRED = 'ERR0006'
const ERROR_LAST_NAME_REQUIRED = 'ERR0007'
const ERROR_EMAIL_REQUIRED = 'ERR0008'
const ERROR_PHONE_NUMBER_REQUIRED = 'ERR0009'
const ERROR_NOT_AUTHORIZED = 'ERR0010'

const ERRORS = {
    [ERROR_FIRST_NAME_REQUIRED]: 'First name is required.',
    [ERROR_LAST_NAME_REQUIRED]: 'Last name is required.',
    [ERROR_EMAIL_REQUIRED]: 'Email is required.',
    [ERROR_PHONE_NUMBER_REQUIRED]: 'Phone number is required.',
    [ERROR_NOT_AUTHORIZED]: 'You are not authorized for this operation. Are you logged in?',
}

const STATUS_CODE_SUCCESS = 'success'
const STATUS_CODE_FAILURE = 'fail'
const STATUS_CODE_PENDING = 'pending'
const STATUS_CODE_REDIRECT = 'redirect'

export {
    SORT_UP,
    SORT_DOWN,
    SORT_ORDER,
    ERROR_FIRST_NAME_REQUIRED,
    ERROR_LAST_NAME_REQUIRED,
    ERROR_EMAIL_REQUIRED,
    ERROR_PHONE_NUMBER_REQUIRED,
    ERROR_NOT_AUTHORIZED,
    ERRORS,
    STATUS_CODE_SUCCESS,
    STATUS_CODE_FAILURE,
    STATUS_CODE_PENDING,
    STATUS_CODE_REDIRECT,
}
