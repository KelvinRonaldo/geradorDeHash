$(document).ready(function(){
	$(".btns").each(function () {
		$(this).click(function(){
			let whatHex = $(this).attr("id");
			whatHex = whatHex.split("-");
			whatHex = whatHex[1];
			switch (whatHex) {
				case "MD5":
					$("#hash").val(hex_md5($("#input").val()));					
					break;
				case "SHA1":
					$("#hash").val(hex_sha1($("#input").val()));
					break;
				case "SHA256":
					$("#hash").val(hex_sha256($("#input").val()));
					break;
				case "SHA512":
					$("#hash").val(hex_sha512($("#input").val()));
					break;
			}
		});
	});
});