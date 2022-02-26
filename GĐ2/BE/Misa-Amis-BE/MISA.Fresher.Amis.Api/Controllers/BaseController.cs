using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MiSA.Fresher.Amis.Core.InterFace.Service;

namespace MISA.Fresher.Amis.Api.Controllers
{
    /// <summary>
    /// Base controller dùng chung
    /// </summary>
    /// <typeparam name="TEntity"></typeparam>
    /// CreatedBy: DQDUY (20/12/2021)
    [Route("api/v1/[controller]")]
    [ApiController]
    public class BaseController<TEntity> : ControllerBase
    {
        private readonly IBaseService<TEntity> _baseService;
        public BaseController(IBaseService<TEntity> baseService)
        {
            _baseService = baseService;
        }

        /// <summary>
        /// Phương thức GET, lấy toàn bộ dữ liệu
        /// </summary>
        /// <returns></returns>
        /// CreatedBy: DQDUY (20/12/2021)
        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                var result = _baseService.GetAll();
                return Ok(result);
            }catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        /// <summary>
        /// Phương thức Get theo Id
        /// </summary>
        /// <param name="entityId"></param>
        /// <returns></returns>
        /// CreatedBy: DQDUY (20/12/2021)
        [HttpGet("{entityId}")]
        public IActionResult Get(Guid entityId)
        {
            try
            {
                var result = _baseService.GetById(entityId);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        /// <summary>
        /// Phương thực POST, thêm mới dữ liệu
        /// </summary>
        /// <param name="entity"></param>
        /// <returns></returns>
        /// CreatedBy: DQDUY (20/12/2021)
        [HttpPost]
        public IActionResult Insert([FromBody] TEntity entity)
        {
          
                var result = _baseService.Insert(entity);
                return Ok(result);
            
        }

        /// <summary>
        /// Phương thức PUT để cập nhật dữ liệu
        /// </summary>
        /// <param name="entityId"></param>
        /// <param name="entity"></param>
        /// <returns></returns>
        /// CreatedBy: DQDUY (20/12/2021)
        [HttpPut("{entityId}")]
        public IActionResult Update(Guid entityId, [FromBody] TEntity entity)
        {
            var result = _baseService.Update(entityId, entity);
            return Ok(result);
        }

        /// <summary>
        /// Phương thức Delete, xoá dữ liệu
        /// </summary>
        /// <param name="entityId"></param>
        /// <returns></returns>
        /// CreatedBy: DQDUY (20/12/2021)
        [HttpDelete("{entityId}")]
        public IActionResult Delete(Guid entityId)
        {
            try
            {
                var result = _baseService.Delete(entityId);
                return Ok(result);
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
           
        }
    }
}
