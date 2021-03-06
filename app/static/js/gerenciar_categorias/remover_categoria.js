$(document).ready(function () {
    if ($("#menu-categorias-selecionadas").children().length > 0) {
        $("#menu-categorias-selecionadas span").each(function() {
            $("form input[name = 'categorias_selecionadas']").val(
                $("form input[name = 'categorias_selecionadas']").val() +
                $(this).children("input").attr("name") + "_" +
                $(this).children("input").val() + ";"
            );

            $("#menu-adicionar-categoria #" + $(this).children("button").attr("id")).parent().remove();
        });
    }

    if ($("#menu-adicionar-categoria").children().length == 0) {
        $("#todas-categorias").remove();
    }

    $("#menu-categorias-selecionadas span button").each(function() {
        $(this).click($(this).parent().children("input").val(), remover_categoria);
    });
});
function remover_categoria(indice) {
    let input_categorias_selecionadas = $("form input[name = 'categorias_selecionadas']");

    let menu_adicionar_categorias = $("#menu-adicionar-categoria");
    let span_categorias_selecionadas = $("#span_" + indice.data);
    
    if ($("#todas-categorias").length == 0) {
        let h4_todas_categorias = $("<h4 id='todas-categorias' class='text-center'>Todas as Categorias</h4>");
        h4_todas_categorias.insertBefore(menu_adicionar_categorias);
    }

    let span = $("<span class='badge-pill bg-warning espaco-interno-10 espaco-externo-horizontal-10'><span>");
    let button = $("<button type='button' name='adicionar' class='badge badge-light bg-light'>V</button>");
    let input = $("<input type='hidden'>");

    button.attr("id", "botao_" + indice.data);

    input.attr("name", span_categorias_selecionadas.children("input").attr("name"));
    input.val(indice.data);

    button.click("botao_" + indice.data, adicionar_categoria);

    span_categorias_selecionadas.children().remove();
    span_categorias_selecionadas.text(span_categorias_selecionadas.text().replace(" ", ""));

    span.text(span_categorias_selecionadas.text());
    $(span).append(button);
    $(span).append(input);

    menu_adicionar_categorias.append(span);

    span_categorias_selecionadas.remove();

    input_categorias_selecionadas_temp = "";

    if ($("#menu-categorias-selecionadas span").children().length > 0) {
        $("#menu-categorias-selecionadas span").each(function() {
            input_categorias_selecionadas_temp += $(this).children("input").attr("name") + "_" + $(this).children("input").val() + ";";
        });
    }
    else {
        input_categorias_selecionadas.val("");
    }

    input_categorias_selecionadas.val(input_categorias_selecionadas_temp);
    
    if ($("#menu-categorias-selecionadas").children().length == 0) {
        $("#menu-categorias-selecionadas").remove();
        $("#categorias-selecionadas").remove();
    }
}