<script>
    const contactForm = document.getElementById('contactForm');

    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault(); // 阻止默认跳转

        const formData = new FormData(this); // 获取表单数据

        try {
            const response = await fetch(this.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                alert('消息发送成功！我会尽快回复你～');
                this.reset(); // 清空表单
            } else {
                alert('发送失败，请稍后再试');
            }
        } catch (error) {
            alert('网络错误，请检查网络连接');
        }
    });
</script>
