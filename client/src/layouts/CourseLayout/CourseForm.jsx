import { useAuth } from "../../store/auth";
import { FaSave } from "react-icons/fa";

const CourseForm = ({handleSubmit, handleChange,  handleFetchFromYoutube , newCourse, isDark, isUpdate = false}) => {
    const {coursesData} = useAuth();

    const inputClasses = `w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary transition-colors ${
        isDark
            ? 'bg-dark-bg-tertiary border-dark-border text-dark-text-primary focus:bg-dark-bg-primary'
            : 'bg-light-bg-tertiary border-light-border text-light-text-primary focus:bg-light-bg-primary'
    }`;

    const labelClasses = `block text-sm font-medium mb-2 ${
        isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'
    }`;

    return (
        //Changing positions in prev form
        <form onSubmit={(e) => handleSubmit(e)} className="space-y-6">

            {/* Row 1 - Two inputs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label htmlFor="course_category" className={labelClasses}>Course Category</label>
                    <input
                        type="text"
                        name="course_category"
                        id="course_category"
                        placeholder="Enter course category"
                        required
                        value={newCourse.course_category}
                        onChange={handleChange}
                        className={inputClasses}
                    />
                </div>

                <div>
                    <label htmlFor="course_type" className={labelClasses}>Course Type</label>
                    <input
                        type="text"
                        name="course_type"
                        id="course_type"
                        placeholder="Enter course type (e.g., Tutorial, Project)"
                        required
                        value={newCourse.course_type}
                        onChange={handleChange}
                        className={inputClasses}
                    />
                </div>
            </div>

            {/* Row 2 - YouTube Video ID */}
            <div>
                <label htmlFor="course_youtube_id" className={labelClasses}>YouTube Video ID</label>
                <input
                    type="text"
                    name="course_youtube_id"
                    id="course_youtube_id"
                    placeholder="Enter YouTube Video ID"
                    required
                    value={newCourse.course_youtube_id}
                    onChange={handleChange}
                    className={inputClasses}
                />
                <p className="text-xs text-gray-500 mt-1">
                    Eg: In <code>https://www.youtube.com/watch?v=abc123</code>, ID is <code>abc123</code>
                </p>
            </div>

            {/* Row 3 - Fetch Button */}
            <div className="flex justify-start">
                <button
                    type="button"
                    onClick={handleFetchFromYoutube}
                    className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/80"
                >
                    Fetch from YouTube
                </button>
            </div>

            {/* Remaining fields in 2 columns */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label htmlFor="course_title" className={labelClasses}>Course Title</label>
                    <input
                        type="text"
                        name="course_title"
                        id="course_title"
                        placeholder="Enter course title"
                        required
                        value={newCourse.course_title}
                        onChange={handleChange}
                        className={inputClasses}
                    />
                </div>

                <div>
                    <label htmlFor="creator_name" className={labelClasses}>Creator Name</label>
                    <input
                        type="text"
                        name="creator_name"
                        id="creator_name"
                        placeholder="Enter creator name"
                        required
                        value={newCourse.creator_name}
                        onChange={handleChange}
                        className={inputClasses}
                    />
                </div>

                <div>
                    <label htmlFor="course_image" className={labelClasses}>Course Image URL</label>
                    <input
                        type="url"
                        name="course_image"
                        id="course_image"
                        placeholder="Enter course image URL"
                        required
                        value={newCourse.course_image}
                        onChange={handleChange}
                        className={inputClasses}
                    />
                </div>

                <div>
                    <label htmlFor="creator_image" className={labelClasses}>Creator Image URL</label>
                    <input
                        type="url"
                        name="creator_image"
                        id="creator_image"
                        placeholder="Enter creator image URL"
                        required
                        value={newCourse.creator_image}
                        onChange={handleChange}
                        className={inputClasses}
                    />
                </div>

                <div>
                    <label htmlFor="creator_youtube_link" className={labelClasses}>Course Link</label>
                    <input
                        type="url"
                        name="creator_youtube_link"
                        id="creator_youtube_link"
                        placeholder="Enter course YouTube link"
                        required
                        value={newCourse.creator_youtube_link}
                        onChange={handleChange}
                        className={inputClasses}
                    />
                </div>

                <div>
                    <label htmlFor="description" className={labelClasses}>Description</label>
                    <textarea
                        name="description"
                        id="description"
                        placeholder="Enter course description"
                        required
                        rows="4"
                        value={newCourse.description}
                        onChange={handleChange}
                        className={inputClasses}
                    ></textarea>
                </div>
            </div>

            {/* Submit button */}
            <div className="flex justify-end pt-4">
                <button
                    type="submit"
                    className="flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary-dark text-white font-medium rounded-lg transition-all duration-300"
                >
                    <FaSave />
                    <span>{isUpdate ? 'Update Course' : 'Add Course'}</span>
                </button>
            </div>
        </form>
         //prev form 
        // <form onSubmit={(e) => handleSubmit(e)} className="space-y-6">
        //     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        //         {/* Left Column */}
        //         <div className="space-y-4">
        //             <div>
        //                 <label htmlFor="course_category" className={labelClasses}>
        //                     Course Category
        //                 </label>
        //                 <input
        //                     type="text"
        //                     name="course_category"
        //                     id="course_category"
        //                     placeholder="Enter course category"
        //                     list="course_category_list"
        //                     required
        //                     value={newCourse.course_category}
        //                     onChange={handleChange}
        //                     autoComplete="off"
        //                     className={inputClasses}
        //                 />
        //                 <datalist id="course_category_list">
        //                     {coursesData && [...new Set(coursesData.map(course => course.course_category))].map((category) => (
        //                         <option value={category} key={category}>{category}</option>
        //                     ))}
        //                 </datalist>
        //             </div>
        //                                 <div>
        //                 <label htmlFor="course_type" className={labelClasses}>
        //                     Course Type
        //                 </label>
        //                 <input
        //                     type="text"
        //                     name="course_type"
        //                     id="course_type"
        //                     placeholder="Enter course type (e.g., Tutorial, Project)"
        //                     required
        //                     value={newCourse.course_type}
        //                     onChange={handleChange}
        //                     autoComplete="off"
        //                     className={inputClasses}
        //                 />
        //             </div>
        //             <div>
        //                 <label htmlFor="course_youtube_id" className={labelClasses}>
        //                     YouTube Video ID
        //                 </label>
        //                 <input
        //                     type="text"
        //                     name="course_youtube_id"
        //                     id="course_youtube_id"
        //                     placeholder="Enter YouTube Video ID"
        //                     required
        //                     value={newCourse.course_youtube_id}
        //                     onChange={handleChange}
        //                     autoComplete="off"
        //                     className={inputClasses}
        //                 />
        //                 <p className="text-xs text-gray-500 mt-1">
        //                     Eg : In  <code> https://www.youtube.com/watch?v=abc123</code>,
        //                     ID is <code>abc123</code>
        //                 </p>
        //             </div>
        //             <div className="flex justify-end">
        //                 <button
        //                     type="button"
        //                     onClick={handleFetchFromYoutube}
        //                     className={`px-4 py-2 bg-primary text-white rounded hover:bg-primary/80`}
        //                 >
        //                     Fetch from YouTube
        //                 </button>
        //             </div>

        //             <div>
        //                 <label htmlFor="course_title" className={labelClasses}>
        //                     Course Title
        //                 </label>
        //                 <input
        //                     type="text"
        //                     name="course_title"
        //                     id="course_title"
        //                     placeholder="Enter course title"
        //                     required
        //                     value={newCourse.course_title}
        //                     onChange={handleChange}
        //                     autoComplete="off"
        //                     className={inputClasses}
        //                 />
        //             </div>

        //             <div>
        //                 <label htmlFor="course_image" className={labelClasses}>
        //                     Course Image URL
        //                 </label>
        //                 <input
        //                     type="url"
        //                     name="course_image"
        //                     id="course_image"
        //                     placeholder="Enter course image URL"
        //                     required
        //                     value={newCourse.course_image}
        //                     onChange={handleChange}
        //                     autoComplete="off"
        //                     className={inputClasses}
        //                 />
        //             </div>

        //             <div>
        //                 <label htmlFor="description" className={labelClasses}>
        //                     Description
        //                 </label>
        //                 <textarea
        //                     name="description"
        //                     id="description"
        //                     placeholder="Enter course description"
        //                     required
        //                     rows="4"
        //                     value={newCourse.description}
        //                     onChange={handleChange}
        //                     className={inputClasses}
        //                 ></textarea>
        //             </div>
        //         </div>

        //         {/* Right Column */}
        //         <div className="space-y-4">
        //             <div>
        //                 <label htmlFor="creator_name" className={labelClasses}>
        //                     Creator Name
        //                 </label>
        //                 <input
        //                     type="text"
        //                     name="creator_name"
        //                     id="creator_name"
        //                     placeholder="Enter creator name"
        //                     required
        //                     value={newCourse.creator_name}
        //                     onChange={handleChange}
        //                     autoComplete="off"
        //                     className={inputClasses}
        //                 />
        //             </div>

        //             <div>
        //                 <label htmlFor="creator_image" className={labelClasses}>
        //                     Creator Image URL
        //                 </label>
        //                 <input
        //                     type="url"
        //                     name="creator_image"
        //                     id="creator_image"
        //                     placeholder="Enter creator image URL"
        //                     required
        //                     value={newCourse.creator_image}
        //                     onChange={handleChange}
        //                     autoComplete="off"
        //                     className={inputClasses}
        //                 />
        //             </div>

        //             <div>
        //                 <label htmlFor="creator_youtube_link" className={labelClasses}>
        //                     Course Link
        //                 </label>
        //                 <input
        //                     type="url"
        //                     name="creator_youtube_link"
        //                     id="creator_youtube_link"
        //                     placeholder="Enter course YouTube link"
        //                     required
        //                     value={newCourse.creator_youtube_link}
        //                     onChange={handleChange}
        //                     autoComplete="off"
        //                     className={inputClasses}
        //                 />
        //             </div>
        //         </div>
        //     </div>

        //     <div className="flex justify-end pt-4">
        //         <button
        //             type="submit"
        //             className="flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary-dark text-white font-medium rounded-lg transition-all duration-300"
        //         >
        //             <FaSave />
        //             <span>{isUpdate ? 'Update Course' : 'Add Course'}</span>
        //         </button>
        //     </div>
        // </form>
    );
}

export default CourseForm;