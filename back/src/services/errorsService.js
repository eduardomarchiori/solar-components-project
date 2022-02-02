const getError = (error) => {
  if(error === 'Invalid signup inputs'){
    return buildError('Erro ao criar sessão', 'Por favor, verifique se todas informações foram preenchidas.');
  }

  if(error === 'Invalid signin inputs'){
    return buildError('Erro ao iniciar sessão', 'Por favor, verifique se todas informações foram preenchidas.');
  }

  if(error === 'Invalid cubage inputs'){
    return buildError('Erro ao calcular cubagem', 'Por favor, verifique se todas informações foram preenchidas.');
  }

  if(error === 'Invalid creation component inputs'){
    return buildError('Erro ao criar componente', 'Por favor, verifique se todas informações foram preenchidas.');
  }

  if(error === 'Invalid update component inputs'){
    return buildError('Erro ao atualizar componente', 'Por favor, verifique se todas informações foram preenchidas.');
  }

  if(error === 'Invalid delete component inputs'){
    return buildError('Erro ao remover componente', 'Por favor, verifique se todas informações foram preenchidas.');
  }

  if(error === 'Invalid get components inputs'){
    return buildError('Erro ao obter os componentes', 'Por favor, verifique se todas informações foram preenchidas.');
  }

  if(error === 'Not found components'){
    return buildError('Erro ao obter os componentes componente', 'Por favor, tente novamente mais tarde.');
  }

  if(error === 'Logistic dimension creation invalid'){
    return buildError('Erro ao criar componente', 'Por favor, tente novamente mais tarde.');
  }

  if(error === 'Logistic dimension update invalid'){
    return buildError('Erro ao atualizar componente', 'Por favor, tente novamente mais tarde.');
  }

  if(error === 'User already created'){
    return buildError('Usuário existente', 'Por favor, utilize outras informações de usuário.');
  }

  if(error === 'User not found'){
    return buildError('Usuário não encontrado', 'Por favor, verifique se as informações preenchidas estão corretas.');
  }

  if(error === 'Incorrect credentials'){
    return buildError('Erro ao validar sessão', 'Por favor, verifique se as informações preenchidas estão corretas.');
  }

  if(error === 'Invalid email input'){
    return buildError('E-mail inválido', 'Por favor, verifique se seu e-mail está correto.');
  }

  return buildError('Ocorreu um erro', 'Por favor, tente conectar novamente mais tarde.');
}

const buildError = (error, content) => ({ error, content });

module.exports = {
  getError,
}