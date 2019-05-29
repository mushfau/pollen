$(document).ready(function () {
    $('#prod_details').summernote();

    // var dropzone = $('.dropzones')

    var a = document.querySelector('#mydroppable')

    if (a) {
        const droppable = new Droppable({
            element: a
        })

        droppable.onFilesDropped((files) => {
            var b = $('#images');
            // console.log('Files were dropped:', files[0]);
            console.log('Files were dropped:', b);
  

            // var files = [
            //     new File(['content'], 'sample1.txt'),
            //     new File(['abc'], 'sample2.txt')
            // ];


            b[0].files = new FileListItem(files)
            // let data = new FormData();
            // files.forEach(element => {
            //     data.append(element);
            // });

            // var b = new FileList<File>();
            // b.push(files[0])
            // console.log(b)
            // b[0].files.push(files[0])
            // $('#images').files[0] = files[0]
        });
    }




    // dropzone.on('drag dragstart dragend dragover dragenter dragleave drop', function (e) {
    //     e.preventDefault();
    //     e.stopPropagation();
    // })

    // dropzone.on('dragover dragenter', function () {
    //     $(this).addClass('is-dragover');
    // })
    // dropzone.on('dragleave dragend drop', function () {
    //     $(this).removeClass('is-dragover');
    // })

    // dropzone.on('drop', function (e) {
    //     var files = e.originalEvent.dataTransfer.files;
    //     console.log(files)
    //     // Now select your file upload field 
    //     // $('input_field_file').prop('files',files)
    // });
});


function FileListItem(a) {
    a = [].slice.call(Array.isArray(a) ? a : arguments)
    for (var c, b = c = a.length, d = !0; b-- && d;) d = a[b] instanceof File
    if (!d) throw new TypeError("expected argument to FileList is File or array of File objects")
    for (b = (new ClipboardEvent("")).clipboardData || new DataTransfer; c--;) b.items.add(a[c])
    return b.files
}

