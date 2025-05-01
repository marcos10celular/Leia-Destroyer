// Função para criar e mostrar uma notificação no canto superior direito
function showPageNotification(message) {
    // Criar elemento de notificação
    const notification = document.createElement('div');
    
    // Estilizar a notificação
    notification.style.position = 'fixed';
    notification.style.top = '20px';
    notification.style.right = '20px';
    notification.style.backgroundColor = '#4CAF50';
    notification.style.color = 'white';
    notification.style.padding = '12px 20px';
    notification.style.borderRadius = '8px';
    notification.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
    notification.style.zIndex = '9999';
    notification.style.opacity = '0';
    notification.style.transition = 'opacity 0.3s ease-in-out';
    notification.style.fontFamily = 'Arial, sans-serif';
    notification.style.fontSize = '14px';
    notification.style.fontWeight = 'bold';
    notification.style.display = 'flex';
    notification.style.alignItems = 'center';
    notification.style.justifyContent = 'center';
    
    // Ícone para a notificação
    const icon = document.createElement('div');
    icon.innerHTML = '📄';
    icon.style.marginRight = '10px';
    icon.style.fontSize = '18px';
    
    // Texto da notificação
    const text = document.createElement('div');
    text.textContent = message;
    
    // Montar a notificação
    notification.appendChild(icon);
    notification.appendChild(text);
    
    // Adicionar ao corpo do documento
    document.body.appendChild(notification);
    
    // Exibir a notificação com animação
    setTimeout(() => {
        notification.style.opacity = '1';
    }, 100);
    
    // Remover após 3 segundos
    setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Função para clicar no botão de próxima página
function clickNextPageButton() {
    // Obter informação da página atual
    const pageInfoElement = document.querySelector('div.sc-dicizt.jpZPHL span.sc-jRsXiD.jyuMzT');
    const pageText = pageInfoElement ? pageInfoElement.textContent : 'desconhecido';
    
    // Mostrar notificação com a página atual
    showPageNotification(`Avançando: Página ${pageText}`);
    
    // Tentar vários seletores possíveis para o botão "próxima página"
    const nextPageSelectors = [
        // Botão no caminho XPath fornecido anteriormente
        "/html/body/div[7]/main/div[2]/div[3]/button/span",
        // Botões comuns de "próximo" ou "avançar"
        "button.next-page", 
        "button.next", 
        "a.next-page", 
        "a.next",
        // Botão que pode conter texto como "Próximo" ou "Avançar" ou seta
        "button:contains('Próximo')", 
        "button:contains('Avançar')",
        "button:contains('→')",
        // Outros seletores comuns
        ".pagination-next", 
        ".page-next",
        // Último botão em uma navegação de paginação
        ".pagination button:last-child",
        ".pagination a:last-child"
    ];
    
    // Tentar encontrar o botão usando os seletores
    let buttonFound = false;
    
    // Tentar primeiro com seletores CSS
    for (const selector of nextPageSelectors) {
        if (selector.startsWith("/")) {
            // É um XPath
            const button = document.evaluate(
                selector,
                document,
                null,
                XPathResult.FIRST_ORDERED_NODE_TYPE,
                null
            ).singleNodeValue;
            
            if (button) {
                button.click();
                buttonFound = true;
                console.log("Clicado no botão usando XPath:", selector);
                break;
            }
        } else {
            // É um seletor CSS
            try {
                const button = document.querySelector(selector);
                if (button) {
                    button.click();
                    buttonFound = true;
                    console.log("Clicado no botão usando seletor:", selector);
                    break;
                }
            } catch (e) {
                // Alguns seletores personalizados como :contains podem não ser suportados
                console.log("Erro ao tentar seletor:", selector, e);
            }
        }
    }
    
    // Tentar encontrar por texto ou ícone se nenhum seletor funcionou
    if (!buttonFound) {
        const allButtons = document.querySelectorAll('button, a.button, input[type="button"], input[type="submit"]');
        for (const button of allButtons) {
            const buttonText = button.textContent.toLowerCase();
            if (buttonText.includes('próximo') || buttonText.includes('próxima') || 
                buttonText.includes('avançar') || buttonText.includes('next') ||
                buttonText.includes('→') || buttonText.includes('>')) {
                button.click();
                buttonFound = true;
                console.log("Clicado no botão pelo texto:", buttonText);
                break;
            }
        }
    }
    
    if (!buttonFound) {
        showPageNotification("Não foi possível encontrar o botão de próxima página");
        console.error("Não foi possível encontrar nenhum botão de próxima página");
    }
}

// Executar a função para clicar e mostrar a notificação
clickNextPageButton();

// Configurar para avançar automaticamente a cada 3 segundos
const intervalId = setInterval(clickNextPageButton, 3000);

// Para parar o script (adicionar no console quando quiser parar):
// clearInterval(intervalId);

console.log("Script de paginação automática iniciado. Execute clearInterval(intervalId) para parar.");