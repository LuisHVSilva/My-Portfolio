const HTTP_STATUS = {
    OK: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    NOT_FOUND: 404,
    CONFLICT: 409,
    UNPROCESSABLE_ENTITY: 422,
    INTERNAL_SERVER_ERROR: 500
};

const tokenCreateUserExpirationTime = '20m';

const VALIDATOR_FIELDS = {
    BLOG_ID: 'BLOG ID',
    CONFIRM_EMAIL: 'EMAIL DE CONFIRMAÇÃO',
    CONFIRM_PASSWORD: 'SENHA DE CONFIRMAÇÃO',
    CATEGORY_ID: 'CATEGORY ID',
    EMAIL: 'EMAIL',
    NAME: 'NOME',
    PASSWORD: 'SENHA',
    SUBTITLE: 'SUBTÍTULO',
    TAG_ID: 'TAG ID',
    TEXT: 'TEXTO',
    TITLE: 'TÍTULO',
}

const ERROR_MESSAGES = {
    INVALID_BLOG: 'Blog inválido.',
    INVALID_CATEGORY: 'Categoria inválida.',
    INVALID_CONFIRM_EMAIL: 'Email de confirmação inválido',
    INVALID_CONFIRM_PASSWORD: 'Senha de confirmação inválida',
    INVALID_CONFIRM_USER_LENGTH: 'Favor preencher todos os campos',
    INVALID_CONFIRM_USER_DATA: 'Dado inválido.',
    INVALID_CREDENTIALS: 'Credenciais inválidas.',
    INVALID_EMAIL: 'Email inválido',
    INVALID_NAME: 'Nome inválido',
    INVALID_PASSWORD: 'Senha inválida',
    INVALID_TAG: 'Tag inválida',
    INVALID_TABLE: 'Tabela inválida',
    INVALID_TOKEN: 'Token inválido.',
    INVALID_USER: 'Usuário inválido',
    NOT_FOUND_BLOG_CATEGORY: 'Relação blog | categoria não encontrada.',
    NOT_FOUND_BLOG_TAG: 'Relação blog | tag não encontrada.',
    REGISTERED_BLOG: 'Blog já cadastrado.',
    REGISTERED_BLOG_CATEGORY: 'Categoria já registrada para o blog.',
    REGISTERED_BLOG_TAG: 'Tag já registrada para o blog.',
    REGISTERED_CATEGORY: 'Categoria já cadastrada.',
    REGISTERED_EMAIL: 'Email já cadastrado',
    REGISTERED_TAG: 'Tag já cadastrada.',
    CREATE_USER_TOKEN: 'Usuário inválido para criar o token.',
    DENIED_ACCESS: 'Acesso negado.',
    DISABLE_USER: 'Usuário desativado',
    EXPIRED_TIME_CONFIRM_USER_TOKEN: 'Código expirado.',
    HIGHLIGHT_LENGTH: 'A quantidade de blogs em destaque já possui o máximo possível: ',
}

const SUCCESS_MESSAGES = {
    REGISTERED_BLOG: 'Blog cadastrado com sucesso.',
    REGISTERED_BLOG_CATEGORY: 'Categoria registrada com sucesso para o blog',
    REGISTERED_BLOG_TAG: 'Tag registrada com sucesso para o blog',
    REGISTERED_CATEGORY: 'Categoria cadastrada com sucesso.',
    REGISTERED_TAG: 'Tag cadastrada com sucesso.',
    REGISTERED_USER: 'Usuário registrado.',
    UPDATED_BLOG: 'Blog atualizado com sucesso.',
    UPDATED_CATEGORY: 'Categoria atualizada com sucesso.',
    UPDATED_TAG: 'Tag atualizada com sucesso.',
    UPDATED_USER: 'Usuário atualizado com sucesso.',
    DELETED_AUTHENTICATED_TOKEN: 'Tokens deletados com sucesso',
    DELETED_BLOG: 'Blog excluído com sucesso.',
    DELETED_BLOG_CATEGORY: 'Relação blog-categoria deletada com sucesso.',
    DELETED_BLOG_TAG: 'Relação blog-tag deletada com sucesso.',
    DELETED_CATEGORY: 'Categoria deletada com sucesso.',
    DELETED_TAG: 'Tag excluída com sucesso.',
    DELETED_USER: 'Usuário excluído com sucesso.',
    AUTHENTICATED_USER: 'Usuário autenticado.',
    LOGIN: 'Login bem-sucedido.',
    LOGOUT: 'Logout bem-sucedido.',
}

const LOG_OPTIONS = {
    CREATE: 'create',
    UPDATE: 'update',
    DELETE: 'delete',
    AVALILABLE: 'available'
}

module.exports = { HTTP_STATUS, VALIDATOR_FIELDS, ERROR_MESSAGES, SUCCESS_MESSAGES, LOG_OPTIONS, tokenCreateUserExpirationTime };